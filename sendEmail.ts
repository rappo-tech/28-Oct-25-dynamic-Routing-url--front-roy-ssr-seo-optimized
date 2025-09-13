// scripts/send-email.js
import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env' });

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTestEmail() {
  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['anuragdnd456@gmail.com'], // Replace with your email
      subject: 'Test Email from My Agency',
      html: `<p>Hello! This is a test email from my web dev agency.</p>`
    });
    
    console.log('✅ Email sent successfully!', result);
  } catch  {
    console.log('❌ Error sending email:',);
  }
}

sendTestEmail();