import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getCompanyEmailTemplate, getUserEmailTemplate } from './email-templates';

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body)
    const { name, email, phone, company, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'long',
    });

    // Email to Company
    const companyEmailOptions = {
      from: `"AnalogChips Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.COMPANY_EMAIL || 'sales@analog-chips.com',
      subject: `🔔 New Contact Form Submission from ${name}`,
      html: getCompanyEmailTemplate({ name, email, phone, company, message, timestamp }),
      replyTo: email,
    };

    // Auto-reply to User
    const userEmailOptions = {
      from: `"AnalogChips Technology" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank you for contacting AnalogChips Technology',
      html: getUserEmailTemplate({ name }),
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(companyEmailOptions),
      transporter.sendMail(userEmailOptions),
    ]);

    console.log('Emails sent successfully to:', { company: process.env.COMPANY_EMAIL, user: email });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your inquiry. We will get back to you soon!',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}