// app/api/products/route.ts
import { connectToDatabase } from '@/app/lib/mongodb';
import Product from '@/app/models/Product';
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import fs from 'fs';

// Helper function to ensure directory exists
async function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    await fs.promises.mkdir(dir, { recursive: true });
  }
}

// Helper function to save product image
async function saveProductImage(file: File, productId: string): Promise<string> {
  const uploadDir = path.join(process.cwd(), 'uploads', 'products', productId);
  await ensureDirectoryExists(uploadDir);
  
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 10);
  const ext = path.extname(file.name);
  const filename = `${timestamp}-${randomString}${ext}`;
  const filePath = path.join(uploadDir, filename);
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await writeFile(filePath, buffer);
  
  return `/api/uploads/products/${productId}/${filename}`;
}

// Helper function to delete product images
async function deleteProductImages(productId: string) {
  const productDir = path.join(process.cwd(), 'uploads', 'products', productId);
  if (fs.existsSync(productDir)) {
    await fs.promises.rm(productDir, { recursive: true, force: true });
  }
}

// GET - Fetch all products
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
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    
    const products = await Product.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST - Create new product with image upload
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const specs = formData.get('specs') as string;
    const status = formData.get('status') as string || 'Active';
    const image = formData.get('image') as File;
    
    if (!name || !category || !description || !price) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    
    await connectToDatabase();
    
    // Parse specs from comma-separated string
    const specsArray = specs ? specs.split(',').map(s => s.trim()) : [];
    
    // Create product first to get ID
    const product = await Product.create({
      name,
      category,
      description,
      price,
      specs: specsArray,
      status,
      sales: 0,
      image: null
    });
    
    // Handle image upload
    let imageUrl = null;
    if (image && image.size > 0) {
      // Validate image type
      if (!image.type.startsWith('image/')) {
        await Product.findByIdAndDelete(product._id);
        return NextResponse.json({ success: false, error: 'Invalid image type' }, { status: 400 });
      }
      
      // Validate image size (max 5MB)
      if (image.size > 5 * 1024 * 1024) {
        await Product.findByIdAndDelete(product._id);
        return NextResponse.json({ success: false, error: 'Image must be less than 5MB' }, { status: 400 });
      }
      
      imageUrl = await saveProductImage(image, product._id.toString());
      product.image = imageUrl;
      await product.save();
    }
    
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 });
  }
}

// PUT - Update product with image upload
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const specs = formData.get('specs') as string;
    const status = formData.get('status') as string;
    const image = formData.get('image') as File;
    const removeImage = formData.get('removeImage') as string;
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 });
    }
    
    await connectToDatabase();
    
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    
    // Update fields
    if (name) product.name = name;
    if (category) product.category = category;
    if (description) product.description = description;
    if (price) product.price = price;
    if (specs) product.specs = specs.split(',').map(s => s.trim());
    if (status) product.status = status;
    
    // Handle image removal
    if (removeImage === 'true' && product.image) {
      await deleteProductImages(product._id.toString());
      product.image = null;
    }
    
    // Handle new image upload
    if (image && image.size > 0) {
      // Validate image type
      if (!image.type.startsWith('image/')) {
        return NextResponse.json({ success: false, error: 'Invalid image type' }, { status: 400 });
      }
      
      // Validate image size (max 5MB)
      if (image.size > 5 * 1024 * 1024) {
        return NextResponse.json({ success: false, error: 'Image must be less than 5MB' }, { status: 400 });
      }
      
      // Delete old images
      await deleteProductImages(product._id.toString());
      // Save new image
      const imageUrl = await saveProductImage(image, product._id.toString());
      product.image = imageUrl;
    }
    
    await product.save();
    
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ success: false, error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE - Delete product and associated images
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 });
    }
    
    await connectToDatabase();
    
    // Delete product images
    await deleteProductImages(id);
    
    // Delete product from database
    await Product.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 500 });
  }
}