import { Resend } from 'resend';
import { WaitlistEntry, ContactFormData } from '../types';
import { config } from '../config';

// Initialize Resend client (only if API key is available)
const resend = config.resendApiKey ? new Resend(config.resendApiKey) : null;

/**
 * Email Service
 * Handles sending transactional emails via Resend
 */
export const emailService = {
  /**
   * Send waitlist confirmation email to new signup
   */
  async sendWaitlistConfirmation(entry: WaitlistEntry): Promise<void> {
    const { fullName, email, companyName } = entry;

    // If no Resend client, log and return (development fallback)
    if (!resend) {
      console.log(`[Email Service] No API key configured. Would send waitlist confirmation to ${email}`);
      console.log(`  - Name: ${fullName}`);
      console.log(`  - Company: ${companyName}`);
      return;
    }

    try {
      const { data, error } = await resend.emails.send({
        from: config.email.from,
        replyTo: config.email.replyTo,
        to: email,
        subject: "You're on the Pcuro Waitlist!",
        html: generateWaitlistEmailHtml(fullName, companyName),
      });

      if (error) {
        console.error(`[Email Service] Resend error for ${email}:`, error);
        return;
      }

      console.log(`[Email Service] Confirmation email sent to ${email}, ID: ${data?.id}`);
    } catch (error) {
      console.error(`[Email Service] Failed to send email to ${email}:`, error);
      // Don't throw - email failure shouldn't block waitlist signup
    }
  },

  /**
   * Send contact form message to Pcuro team
   */
  async sendContactMessage(data: ContactFormData): Promise<boolean> {
    const { name, email, message } = data;

    // If no Resend client, log and return (development fallback)
    if (!resend) {
      console.log(`[Email Service] No API key configured. Would send contact message from ${email}`);
      console.log(`  - Name: ${name}`);
      console.log(`  - Message: ${message}`);
      return true;
    }

    try {
      const { data: emailData, error } = await resend.emails.send({
        from: config.email.from,
        replyTo: email,
        to: config.email.replyTo,
        subject: `Contact Form: Message from ${name}`,
        html: generateContactEmailHtml(name, email, message),
      });

      if (error) {
        console.error(`[Email Service] Resend error for contact from ${email}:`, error);
        return false;
      }

      console.log(`[Email Service] Contact message sent from ${email}, ID: ${emailData?.id}`);
      return true;
    } catch (error) {
      console.error(`[Email Service] Failed to send contact message from ${email}:`, error);
      return false;
    }
  },
};

// Email image URLs (hosted on imgBB)
const EMAIL_IMAGES = {
  logo: 'https://i.ibb.co/Nd2PPnRt/pcuro-logo-new.png',
  icon: 'https://i.ibb.co/TxFyWgd2/pcuro-icon.png',
  linkedin: 'https://i.ibb.co/Hpxn5Ty6/linkedin-icon.png',
  instagram: 'https://i.ibb.co/pBPKHMwq/instagram-icon.png',
};

/**
 * Generate the waitlist confirmation email HTML
 */
function generateWaitlistEmailHtml(fullName: string, companyName: string): string {
  const currentYear = new Date().getFullYear();
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="background-color: #f9fafb; padding: 40px 20px; margin: 0; font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Logo Section -->
    <div style="text-align: center; padding: 48px 40px 32px;">
      <a href="https://pcuro.com" style="text-decoration: none; display: inline-block;">
        <img 
          src="${EMAIL_IMAGES.logo}" 
          alt="Pcuro" 
          width="180" 
          height="39"
          style="display: inline-block; cursor: pointer;"
        />
      </a>
    </div>
    
    <!-- Main Heading -->
    <h1 style="font-size: 36px; font-weight: 700; color: #1a1a1a; text-align: center; margin: 0 40px 40px; line-height: 1.2;">
      You're on the waitlist!
    </h1>
    
    <!-- Welcome Card -->
    <div style="background: linear-gradient(135deg, rgba(107, 44, 243, 0.1) 0%, rgba(202, 221, 153, 0.15) 100%); border-radius: 16px; padding: 48px 40px; margin: 0 40px 32px; text-align: center;">
      <div style="width: 80px; height: 80px; background-color: #ffffff; border-radius: 50%; display: inline-block; margin: 0 auto 24px; text-align: center; line-height: 80px;">
        <img 
          src="${EMAIL_IMAGES.icon}" 
          alt="Pcuro Icon" 
          height="44"
          style="display: inline-block; vertical-align: middle;"
        />
      </div>
      <div style="font-size: 18px; font-weight: 600; color: #1a1a1a; margin-bottom: 16px; line-height: 1.4;">
        Welcome to the future of B2B procurement
      </div>
      <p style="font-size: 15px; color: #4a4a4a; line-height: 1.6; margin-bottom: 32px;">
        Thanks for joining, <strong>${fullName}</strong>! We're excited to have 
        <strong>${companyName}</strong> as part of our early community. You'll be among 
        the first to know when we launch our platform where businesses discover, compare, and buy 
        from trusted suppliers with real-time AI insights.
      </p>
      <a 
        href="mailto:contact@pcuro.com" 
        style="display: inline-block; background-color: #6B46C1; color: #ffffff; padding: 16px 48px; border-radius: 28px; text-decoration: none; font-weight: 600; font-size: 16px;"
      >
        Get in Touch
      </a>
      <p style="font-size: 13px; color: #6b7280; margin-top: 24px; line-height: 1.5;">
        Want to learn more? Reach out at <a href="mailto:contact@pcuro.com" style="color: #6B46C1; text-decoration: none;">contact@pcuro.com</a>
      </p>
    </div>
    
    <!-- Social Links -->
    <div style="text-align: center; padding: 32px 40px;">
      <div style="margin-bottom: 24px;">
        <a href="https://www.linkedin.com/company/pcuro" style="text-decoration: none; display: inline-block; margin: 0 12px;">
          <img src="${EMAIL_IMAGES.linkedin}" alt="LinkedIn" width="32" height="32" style="display: block;" />
        </a>
        <a href="https://x.com/pcurohq" style="text-decoration: none; display: inline-block; margin: 0 12px; width: 32px; height: 32px; background-color: #000000; border-radius: 4px; text-align: center; line-height: 32px; vertical-align: top;">
          <span style="color: #ffffff; font-weight: 700; font-size: 16px;">𝕏</span>
        </a>
        <a href="https://www.instagram.com/pcurohq" style="text-decoration: none; display: inline-block; margin: 0 12px;">
          <img src="${EMAIL_IMAGES.instagram}" alt="Instagram" width="32" height="32" style="display: block;" />
        </a>
      </div>
    </div>
    
    <!-- Copyright -->
    <div style="text-align: center; font-size: 13px; color: #6b7280; padding: 0 40px 32px;">
      <div>Copyright © ${currentYear}. All Rights Reserved.</div>
      <div style="font-weight: 600; color: #1a1a1a; margin: 16px 0;">Pcuro</div>
      <div>701 Tillery St, Unit 12, Austin, TX 78702</div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate the contact form email HTML (sent to Pcuro team)
 */
function generateContactEmailHtml(name: string, email: string, message: string): string {
  const timestamp = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="background-color: #f9fafb; padding: 40px 20px; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
    <!-- Header -->
    <div style="background-color: #6B46C1; padding: 24px 40px;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
        New Contact Form Message
      </h1>
    </div>
    
    <!-- Content -->
    <div style="padding: 32px 40px;">
      <p style="color: #6b7280; font-size: 14px; margin: 0 0 24px;">
        Received on ${timestamp}
      </p>
      
      <!-- Sender Info -->
      <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 80px;">Name:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">
              <a href="mailto:${email}" style="color: #6B46C1; text-decoration: none;">${email}</a>
            </td>
          </tr>
        </table>
      </div>
      
      <!-- Message -->
      <div>
        <h3 style="color: #1a1a1a; font-size: 16px; font-weight: 600; margin: 0 0 12px;">Message:</h3>
        <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; color: #4a4a4a; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
${message}
        </div>
      </div>
      
      <!-- Reply Button -->
      <div style="margin-top: 32px; text-align: center;">
        <a 
          href="mailto:${email}?subject=Re: Your message to Pcuro"
          style="display: inline-block; background-color: #6B46C1; color: #ffffff; padding: 12px 32px; border-radius: 24px; text-decoration: none; font-weight: 600; font-size: 14px;"
        >
          Reply to ${name}
        </a>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}
