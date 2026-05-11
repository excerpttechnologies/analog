// app/api/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Product from '@/app/models/Product';
import Blog from '@/app/models/Blog';
import Job from '@/app/models/Job';
import Inquiry from '@/app/models/Inquiry';
import Media from '@/app/models/Media';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const searchParams = request.nextUrl.searchParams;
    const timeRange = searchParams.get('range') || 'year';
    
    // Get date filters based on time range
    const now = new Date();
    let startDate = new Date();
    if (timeRange === 'week') {
      startDate.setDate(now.getDate() - 7);
    } else if (timeRange === 'month') {
      startDate.setMonth(now.getMonth() - 1);
    } else if (timeRange === 'quarter') {
      startDate.setMonth(now.getMonth() - 3);
    } else {
      startDate.setFullYear(now.getFullYear() - 1);
    }
    
    // Fetch all required data in parallel
    const [
      totalProducts,
      totalBlogs,
      totalJobs,
      totalInquiries,
      totalMedia,
      publishedBlogs,
      activeJobs,
      newInquiries,
      totalViews,
      devices
    ] = await Promise.all([
      Product.countDocuments(),
      Blog.countDocuments(),
      Job.countDocuments(),
      Inquiry.countDocuments(),
      Media.countDocuments(),
      Blog.countDocuments({ status: 'Published' }),
      Job.countDocuments({ status: 'Open' }),
      Inquiry.countDocuments({ status: 'New', createdAt: { $gte: startDate } }),
      Blog.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]),
      // This would come from actual analytics tracking in production
      Promise.resolve([
        { name: 'Desktop', value: 65 },
        { name: 'Mobile', value: 25 },
        { name: 'Tablet', value: 10 }
      ])
    ]);
    
    // Get monthly traffic data (mock - in production, this would come from actual tracking)
    const monthlyData = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 0; i < 12; i++) {
      monthlyData.push({
        month: months[i],
        visitors: Math.floor(Math.random() * 5000) + 1000,
        pageViews: Math.floor(Math.random() * 15000) + 5000,
        avgTime: (Math.random() * 3 + 1.5).toFixed(1)
      });
    }
    
    // Get daily traffic (last 7 days)
    const dailyData = [];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    for (let i = 0; i < 7; i++) {
      dailyData.push({
        day: days[i],
        visits: Math.floor(Math.random() * 600) + 200,
        unique: Math.floor(Math.random() * 500) + 150
      });
    }
    
    // Top pages (mock data - would come from analytics)
    const topPages = [
      { page: '/', views: 12500, bounceRate: 32, avgTime: '2:30' },
      { page: '/products', views: 8750, bounceRate: 28, avgTime: '3:15' },
      { page: '/blog', views: 6200, bounceRate: 45, avgTime: '1:45' },
      { page: '/contact', views: 3400, bounceRate: 52, avgTime: '1:20' },
      { page: '/about', views: 2800, bounceRate: 38, avgTime: '2:00' }
    ];
    
    // Traffic sources (mock data)
    const trafficSources = [
      { name: 'Organic Search', value: 45, color: '#10b981' },
      { name: 'Direct', value: 25, color: '#f59e0b' },
      { name: 'Social Media', value: 15, color: '#ef4444' },
      { name: 'Referral', value: 10, color: '#8b5cf6' },
      { name: 'Email', value: 5, color: '#06b6d4' }
    ];
    
    const totalVisitors = monthlyData.reduce((sum, d) => sum + d.visitors, 0);
    const totalPageViews = monthlyData.reduce((sum, d) => sum + d.pageViews, 0);
    const avgTrafficTime = (monthlyData.reduce((sum, d) => sum + parseFloat(d.avgTime), 0) / 12).toFixed(1);
    const conversionRate = ((totalVisitors / totalPageViews) * 100).toFixed(1);
    
    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalProducts,
          totalBlogs,
          totalJobs,
          totalInquiries,
          totalMedia,
          publishedBlogs,
          activeJobs,
          newInquiries,
          totalViews: totalViews[0]?.total || 0,
          totalVisitors,
          totalPageViews,
          avgTrafficTime,
          conversionRate
        },
        charts: {
          monthlyData,
          dailyData,
          devices,
          trafficSources
        },
        topPages
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch analytics' }, { status: 500 });
  }
}