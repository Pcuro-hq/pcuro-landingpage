import { CreateWaitlistDTO, WaitlistEntry, WaitlistResponse } from '../types';
import { waitlistRepository } from '../repositories';
import { AppError } from '../middlewares';
import { emailService } from './email.service';

/**
 * Waitlist Service
 * Business logic for waitlist operations
 */
export const waitlistService = {
  /**
   * Add a new entry to the waitlist
   * 
   * @throws AppError if email already exists
   */
  async addToWaitlist(data: CreateWaitlistDTO): Promise<WaitlistResponse> {
    // Check for duplicate email
    const existingEntry = await waitlistRepository.findByEmail(data.email);
    
    if (existingEntry) {
      throw new AppError(
        'This email is already on the waitlist',
        409,
        'EMAIL_ALREADY_EXISTS'
      );
    }

    const entry = await waitlistRepository.create(data);

    await emailService.sendWaitlistConfirmation(entry);

    return {
      id: entry.id,
      message: 'Successfully added to the waitlist! We\'ll be in touch soon.',
    };
  },

  /**
   * Get a waitlist entry by ID
   */
  async getEntry(id: string): Promise<WaitlistEntry | null> {
    return waitlistRepository.findById(id);
  },

  /**
   * Get waitlist statistics
   */
  async getStats(): Promise<{ totalSignups: number }> {
    const count = await waitlistRepository.count();
    return { totalSignups: count };
  },
};
