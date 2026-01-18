import { CreateWaitlistDTO, WaitlistEntry, WaitlistResponse } from '../types';
import { waitlistRepository } from '../repositories';
import { AppError } from '../middlewares';

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

    // Create the entry
    const entry = await waitlistRepository.create(data);

    // TODO: Trigger confirmation email here
    // await emailService.sendWaitlistConfirmation(entry);

    console.log('[Service] Successfully added to waitlist:', entry.id);

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
