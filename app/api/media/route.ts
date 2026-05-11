// app/api/media/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Media from '@/app/models/Media';
import { saveFile, deleteFile } from '@/app/lib/fileUpload';

// GET - Fetch all media files
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    let query: any = {};
    if (type && type !== 'All') query.type = type;
    if (category && category !== 'All') query.category = category;
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    const media = await Media.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: media });
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch media' }, { status: 500 });
  }
}

// POST - Upload file
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = (formData.get('category') as string) || 'uploads';
    
    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: 'Invalid file type' }, { status: 400 });
    }
    
    // Validate file size (50MB)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: 'File too large (max 50MB)' }, { status: 400 });
    }
    
    // Save file
    const fileData = await saveFile(file, category);
    
    // Save to database
    await connectToDatabase();
    const media = await Media.create(fileData);
    
    return NextResponse.json({ success: true, data: media }, { status: 201 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, error: 'Failed to upload file' }, { status: 500 });
  }
}

// DELETE - Delete media file
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await connectToDatabase();
    const media = await Media.findById(id);
    
    if (!media) {
      return NextResponse.json({ success: false, error: 'Media not found' }, { status: 404 });
    }
    
    // Delete file from filesystem
    const { deleteFile: removeFile } = await import('@/app/lib/fileUpload');
    await removeFile(media.path);
    
    // Delete from database
    await Media.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true, message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete media' }, { status: 500 });
  }
}