import { Request, Response } from 'express';
import { ContactFormData } from '../types';
import { emailService } from '../services';
import { responseHelper } from '../utils';

/**
 * Contact Controller
 * Handles contact form submissions
 */
export const contactController = {
  /**
   * POST /api/contact
   * Handle contact form submission
   */
  async submit(req: Request, res: Response): Promise<void> {
    const contactData: ContactFormData = req.body;

    const sent = await emailService.sendContactMessage(contactData);

    if (!sent) {
      responseHelper.error(res, 'EMAIL_SEND_FAILED', 'Failed to send message. Please try again later.', 500);
      return;
    }

    responseHelper.success(res, { 
      sent: true, 
      message: "Your message has been sent! We'll get back to you soon." 
    });
  },
};
