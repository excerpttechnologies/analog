// app/api/dashboard/stats/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Product from '@/app/models/Product';
import Blog from '@/app/models/Blog';
import Job from '@/app/models/Job';
import Inquiry from '@/app/models/Inquiry';

export async function GET() {
  try {
    await connectToDatabase();
    
    const [totalProducts, totalBlogs, totalJobs, totalInquiries] = await Promise.all([
      Product.countDocuments(),
      Blog.countDocuments(),
      Job.countDocuments(),
      Inquiry.countDocuments(),
    ]);
    
    const activeJobs = await Job.countDocuments({ status: 'Open' });
    const publishedBlogs = await Blog.countDocuments({ status: 'Published' });
    const newInquiries = await Inquiry.countDocuments({ status: 'New' });
    
    return NextResponse.json({
      success: true,
      data: {
        totalProducts,
        totalBlogs,
        totalJobs,
        totalInquiries,
        activeJobs,
        publishedBlogs,
        newInquiries,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch stats' }, { status: 500 });
  }
}