// Email HTML template for the company (you receive this)
export const getCompanyEmailTemplate = (data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  timestamp: string;
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      background-color: #f1f5f9;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.02);
    }
    .header {
      background: linear-gradient(135deg, #1e3a8a, #06b6d4);
      padding: 32px 24px;
      text-align: center;
    }
    .logo-container {
      margin-bottom: 16px;
    }
    .logo {
      max-width: 180px;
      height: auto;
      background: white;
      border-radius: 12px;
      padding: 8px 16px;
      display: inline-block;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
    .header p {
      color: rgba(255,255,255,0.8);
      margin: 8px 0 0;
      font-size: 14px;
    }
    .content {
      padding: 32px;
    }
    .alert-badge {
      background-color: #fee2e2;
      border-left: 4px solid #ef4444;
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 24px;
    }
    .alert-badge span {
      color: #dc2626;
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section {
      margin-bottom: 24px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 16px;
    }
    .section:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .value {
      font-size: 16px;
      font-weight: 500;
      color: #0f172a;
      word-break: break-word;
      line-height: 1.5;
    }
    .message-box {
      background-color: #f8fafc;
      border-radius: 12px;
      padding: 20px;
      margin-top: 8px;
      border: 1px solid #e2e8f0;
    }
    .message-box .value {
      white-space: pre-wrap;
      font-size: 14px;
      line-height: 1.6;
    }
    .action-buttons {
      display: flex;
      gap: 12px;
      margin-top: 16px;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      text-align: center;
    }
    .btn-primary {
      background: linear-gradient(135deg, #1e3a8a, #06b6d4);
      color: white;
    }
    .btn-secondary {
      background: #f1f5f9;
      color: #1e293b;
      border: 1px solid #e2e8f0;
    }
    .footer {
      background-color: #f8fafc;
      padding: 24px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
    }
    .badge {
      display: inline-block;
      background-color: #10b981;
      color: white;
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 20px;
      font-weight: 600;
    }
    @media (max-width: 480px) {
      .content {
        padding: 20px;
      }
      .action-buttons {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-container">
        <img 
          src="https://res.cloudinary.com/dxzluoydo/image/upload/v1779182002/analog10_qruzqp.png" 
          alt="AnalogChips Technology" 
          class="logo"
          style="max-width: 180px; height: auto; background: white; border-radius: 12px; padding: 8px 16px;"
        />
      </div>
      <h1>New Contact Form Submission</h1>
      <p>AnalogChips Technology</p>
    </div>
    
    <div class="content">
      <div class="alert-badge">
        <span>🔔 ACTION REQUIRED - New Inquiry Received</span>
      </div>
      
      <div class="section">
        <div class="label">
          <span>📅</span> TIMESTAMP
        </div>
        <div class="value">${data.timestamp}</div>
      </div>
      
      <div class="section">
        <div class="label">
          <span>👤</span> FULL NAME
        </div>
        <div class="value">${data.name}</div>
      </div>
      
      <div class="section">
        <div class="label">
          <span>✉️</span> EMAIL ADDRESS
        </div>
        <div class="value">
          <a href="mailto:${data.email}" style="color: #06b6d4; text-decoration: none;">${data.email}</a>
          <span class="badge" style="margin-left: 10px;">Reply Directly</span>
        </div>
      </div>
      
      ${data.phone ? `
      <div class="section">
        <div class="label">
          <span>📞</span> PHONE NUMBER
        </div>
        <div class="value">
          <a href="tel:${data.phone}" style="color: #06b6d4; text-decoration: none;">${data.phone}</a>
        </div>
      </div>
      ` : ''}
      
      ${data.company ? `
      <div class="section">
        <div class="label">
          <span>🏢</span> COMPANY
        </div>
        <div class="value">${data.company}</div>
      </div>
      ` : ''}
      
      <div class="section">
        <div class="label">
          <span>💬</span> MESSAGE
        </div>
        <div class="message-box">
          <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
        </div>
      </div>
      
      <div class="action-buttons">
        <a href="mailto:${data.email}" class="btn btn-primary">📧 Reply to ${data.name}</a>
        <a href="tel:${data.phone || ''}" class="btn btn-secondary">📞 Call Customer</a>
      </div>
    </div>
    
    <div class="footer">
      <p>This is an automated message from AnalogChips Technology website contact form.</p>
      <p>© ${new Date().getFullYear()} AnalogChips Technology Pvt Ltd. All rights reserved.</p>
      <p>Bangalore, India</p>
    </div>
  </div>
</body>
</html>
`;

// Email HTML template for the user (auto-reply)
export const getUserEmailTemplate = (data: {
  name: string;
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting AnalogChips</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      background-color: #f1f5f9;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.02);
    }
    .header {
      background: linear-gradient(135deg, #1e3a8a, #06b6d4);
      padding: 40px 24px;
      text-align: center;
    }
    .logo-container {
      margin-bottom: 16px;
    }
    .logo {
      max-width: 180px;
      height: auto;
      background: white;
      border-radius: 12px;
      padding: 8px 16px;
      display: inline-block;
    }
    .header h1 {
      color: white;
      margin: 16px 0 0;
      font-size: 28px;
      font-weight: 700;
    }
    .content {
      padding: 40px 32px;
    }
    .greeting {
      font-size: 20px;
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 16px;
    }
    .message {
      color: #475569;
      margin-bottom: 24px;
      font-size: 16px;
    }
    .info-box {
      background-color: #f0f9ff;
      border-radius: 12px;
      padding: 20px;
      margin: 24px 0;
      border-left: 4px solid #06b6d4;
    }
    .info-box p {
      margin: 0 0 10px;
      color: #0c4a6e;
    }
    .info-box p:last-child {
      margin-bottom: 0;
    }
    .step {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    .step-number {
      width: 28px;
      height: 28px;
      background: #06b6d4;
      color: white;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
    }
    .contact-links {
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid #e2e8f0;
    }
    .contact-item {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
      color: #475569;
    }
    .footer {
      background-color: #f8fafc;
      padding: 24px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #1e3a8a, #06b6d4);
      color: white;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 8px;
      font-weight: 600;
      margin-top: 16px;
    }
    @media (max-width: 480px) {
      .content {
        padding: 24px 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-container">
        <img 
          src="https://res.cloudinary.com/dxzluoydo/image/upload/v1779182002/analog10_qruzqp.png" 
          alt="AnalogChips Technology" 
          class="logo"
          style="max-width: 180px; height: auto; background: white; border-radius: 12px; padding: 8px 16px;"
        />
      </div>
      <h1>Thank You for Reaching Out!</h1>
    </div>
    
    <div class="content">
      <div class="greeting">Dear ${data.name},</div>
      
      <div class="message">
        Thank you for contacting <strong>AnalogChips Technology</strong>. We have received your inquiry and our team will review it shortly.
      </div>
      
      <div class="info-box">
        <p><strong>📋 What happens next?</strong></p>
        <div class="step">
          <span class="step-number">1</span>
          <span>Our technical team will review your inquiry</span>
        </div>
        <div class="step">
          <span class="step-number">2</span>
          <span>You'll receive a response within 24 business hours</span>
        </div>
        <div class="step">
          <span class="step-number">3</span>
          <span>We may schedule a technical consultation call</span>
        </div>
      </div>
      
      <div class="message">
        In the meantime, feel free to explore our product portfolio and technical documentation.
      </div>
      
      <a href="https://www.analog-chips.com" class="button">Visit Our Website</a>
      
      <div class="contact-links">
        <div class="contact-item">
          <span>📞</span> Call us: <a href="tel:+918012345678" style="color: #06b6d4; text-decoration: none;">+91 80 1234 5678</a>
        </div>
        <div class="contact-item">
          <span>✉️</span> Email: <a href="mailto:sales@analog-chips.com" style="color: #06b6d4; text-decoration: none;">sales@analog-chips.com</a>
        </div>
        <div class="contact-item">
          <span>🌐</span> Website: <a href="https://www.analog-chips.com" style="color: #06b6d4; text-decoration: none;">www.analog-chips.com</a>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} AnalogChips Technology Pvt Ltd. All rights reserved.</p>
      <p>Bangalore, India</p>
      <p style="margin-top: 8px; font-size: 11px;">This is an automated response, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;