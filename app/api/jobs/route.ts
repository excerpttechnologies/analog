// app/api/jobs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Job from '@/app/models/Job';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const searchParams = request.nextUrl.searchParams;
    const department = searchParams.get('department');
    const location = searchParams.get('location');
    const status = searchParams.get('status');
    
    let query: any = {};
    if (department && department !== 'All') query.department = department;
    if (location && location !== 'All') query.location = location;
    if (status && status !== 'All') query.status = status;
    
    const jobs = await Job.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const job = await Job.create(body);
    return NextResponse.json({ success: true, data: job }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create job' }, { status: 500 });
  }
}