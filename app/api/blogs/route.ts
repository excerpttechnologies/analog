// app/api/blogs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import fs from 'fs';
import { connectToDatabase } from '@/app/lib/mongodb';
import Blog from '@/app/models/Blog';

// Helper function to ensure directory exists
async function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    await fs.promises.mkdir(dir, { recursive: true });
  }
}

// Helper function to save image
async function saveImage(file: File, blogId: string): Promise<string> {
  const uploadDir = path.join(process.cwd(), 'uploads', 'blogs', blogId);
  await ensureDirectoryExists(uploadDir);
  
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 10);
  const ext = path.extname(file.name);
  const filename = `${timestamp}-${randomString}${ext}`;
  const filePath = path.join(uploadDir, filename);
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await writeFile(filePath, buffer);
  
  return `/api/uploads/blogs/${blogId}/${filename}`;
}

// Helper function to delete blog images
async function deleteBlogImages(blogId: string) {
  const blogDir = path.join(process.cwd(), 'uploads', 'blogs', blogId);
  if (fs.existsSync(blogDir)) {
    await fs.promises.rm(blogDir, { recursive: true, force: true });
  }
}

// GET - Fetch all blogs
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    
    let query: any = {};
    if (category && category !== 'All') query.category = category;
    if (status && status !== 'All') query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }
    
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// POST - Create new blog with image upload
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const category = formData.get('category') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const readTime = formData.get('readTime') as string;
    const status = formData.get('status') as string || 'Draft';
    const image = formData.get('image') as File;
    
    if (!title || !author || !category || !excerpt || !content) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    
    await connectToDatabase();
    
    // Generate slug from title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return NextResponse.json({ success: false, error: 'Blog with similar title already exists' }, { status: 400 });
    }
    
    // Create blog first to get ID
    const blog = await Blog.create({
      title,
      slug,
      author,
      authorAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(author)}&background=0ea5e9&color=fff`,
      category,
      excerpt,
      content,
      readTime: readTime || '5 min',
      status,
      views: 0,
      likes: 0,
      comments: 0,
      image: null // Will update after upload
    });
    
    // Handle image upload
    let imageUrl = null;
    if (image && image.size > 0) {
      imageUrl = await saveImage(image, blog._id.toString());
      blog.image = imageUrl;
      await blog.save();
    }
    
    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ success: false, error: 'Failed to create blog' }, { status: 500 });
  }
}

// PUT - Update blog with image upload
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const category = formData.get('category') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const readTime = formData.get('readTime') as string;
    const status = formData.get('status') as string;
    const image = formData.get('image') as File;
    const removeImage = formData.get('removeImage') as string;
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Blog ID required' }, { status: 400 });
    }
    
    await connectToDatabase();
    
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }
    
    // Update fields
    if (title) {
      blog.title = title;
      blog.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    if (author) blog.author = author;
    if (category) blog.category = category;
    if (excerpt) blog.excerpt = excerpt;
    if (content) blog.content = content;
    if (readTime) blog.readTime = readTime;
    if (status) blog.status = status;
    
    // Handle image removal
    if (removeImage === 'true' && blog.image) {
      await deleteBlogImages(blog._id.toString());
      blog.image = null;
    }
    
    // Handle new image upload
    if (image && image.size > 0) {
      // Delete old images
      await deleteBlogImages(blog._id.toString());
      // Save new image
      const imageUrl = await saveImage(image, blog._id.toString());
      blog.image = imageUrl;
    }
    
    await blog.save();
    
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ success: false, error: 'Failed to update blog' }, { status: 500 });
  }
}

// DELETE - Delete blog and associated images
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Blog ID required' }, { status: 400 });
    }
    
    await connectToDatabase();
    
    // Delete blog images
    await deleteBlogImages(id);
    
    // Delete blog from database
    await Blog.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete blog' }, { status: 500 });
  }
}