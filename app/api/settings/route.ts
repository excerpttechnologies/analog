// app/api/settings/route.ts (with logo upload)
import { connectToDatabase } from '@/app/lib/mongodb';
import Settings from '@/app/models/Settings';
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

// Helper function to save logo
async function saveLogo(file: File): Promise<string> {
  const uploadDir = path.join(process.cwd(), 'uploads', 'settings');
  await ensureDirectoryExists(uploadDir);
  
  const timestamp = Date.now();
  const ext = path.extname(file.name);
  const filename = `logo-${timestamp}${ext}`;
  const filePath = path.join(uploadDir, filename);
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await writeFile(filePath, buffer);
  
  return `/api/uploads/settings/${filename}`;
}

// Helper function to delete old logo
async function deleteOldLogo(logoUrl: string) {
  if (logoUrl) {
    const filename = path.basename(logoUrl);
    const filePath = path.join(process.cwd(), 'uploads', 'settings', filename);
    if (fs.existsSync(filePath)) {
      await unlink(filePath);
    }
  }
}

// GET - Fetch settings
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create({});
    }
    
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch settings' }, { status: 500 });
  }
}

// PUT - Update settings (with optional logo upload)
export async function PUT(request: NextRequest) {
  try {
    // Check if request is multipart form data (has file) or JSON
    const contentType = request.headers.get('content-type') || '';
    
    let updateData: any = {};
    let logoFile: File | null = null;
    
    if (contentType.includes('multipart/form-data')) {
      // Handle form data with file upload
      const formData = await request.formData();
      
      for (const [key, value] of formData.entries()) {
        if (key === 'logo' && value instanceof File && value.size > 0) {
          logoFile = value;
        } else if (key === 'socialLinks') {
          // Parse social links JSON string
          try {
            updateData.socialLinks = JSON.parse(value as string);
          } catch {
            updateData.socialLinks = value;
          }
        } else if (key === 'emailNotifications' || key === 'pushNotifications' || 
                   key === 'weeklyDigest' || key === 'twoFactorAuth') {
          // Convert string booleans to actual booleans
          updateData[key] = value === 'true';
        } else {
          updateData[key] = value;
        }
      }
    } else {
      // Handle JSON request
      const body = await request.json();
      updateData = body;
      
      // Handle logo removal flag
      if (body.removeLogo === true) {
        const settings = await Settings.findOne();
        if (settings?.logo) {
          await deleteOldLogo(settings.logo);
          updateData.logo = null;
        }
        delete updateData.removeLogo;
      }
    }
    
    await connectToDatabase();
    
    // Get existing settings
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    
    // Handle logo upload
    if (logoFile) {
      // Validate image type
      if (!logoFile.type.startsWith('image/')) {
        return NextResponse.json({ success: false, error: 'Invalid image type' }, { status: 400 });
      }
      
      // Validate image size (max 2MB)
      if (logoFile.size > 2 * 1024 * 1024) {
        return NextResponse.json({ success: false, error: 'Logo must be less than 2MB' }, { status: 400 });
      }
      
      // Delete old logo
      if (settings.logo) {
        await deleteOldLogo(settings.logo);
      }
      
      // Save new logo
      const logoUrl = await saveLogo(logoFile);
      updateData.logo = logoUrl;
    }
    
    // Update settings
    const updatedSettings = await Settings.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, upsert: true, runValidators: true }
    );
    
    return NextResponse.json({ success: true, data: updatedSettings });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 500 });
  }
}

// PATCH - Partial update settings (JSON only)
export async function PATCH(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    const settings = await Settings.findOneAndUpdate(
      {},
      { $set: body },
      { new: true, upsert: true, runValidators: true }
    );
    
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 500 });
  }
}