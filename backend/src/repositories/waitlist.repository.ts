import { WaitlistEntry, CreateWaitlistDTO } from '../types';

// In-memory storage for development (replace with actual DB later)
const waitlistEntries: WaitlistEntry[] = [];

/**
 * Waitlist Repository
 * Handles data persistence for waitlist entries
 * Currently stubbed with in-memory storage
 * 
 * TODO: Replace with actual database integration (Prisma/Drizzle)
 */
export const waitlistRepository = {
  /**
   * Create a new waitlist entry
   */
  async create(data: CreateWaitlistDTO): Promise<WaitlistEntry> {
    const entry: WaitlistEntry = {
      id: `wl_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      fullName: data.fullName,
      companyName: data.companyName,
      email: data.email,
      createdAt: new Date(),
    };

    waitlistEntries.push(entry);
    
    console.log('[Repository] Created waitlist entry:', {
      id: entry.id,
      email: entry.email,
      companyName: entry.companyName,
    });

    return entry;
  },

  /**
   * Find a waitlist entry by email
   */
  async findByEmail(email: string): Promise<WaitlistEntry | null> {
    const normalizedEmail = email.toLowerCase().trim();
    const entry = waitlistEntries.find((e) => e.email === normalizedEmail);
    return entry || null;
  },

  /**
   * Find a waitlist entry by ID
   */
  async findById(id: string): Promise<WaitlistEntry | null> {
    const entry = waitlistEntries.find((e) => e.id === id);
    return entry || null;
  },

  /**
   * Get all waitlist entries (for admin purposes)
   */
  async findAll(): Promise<WaitlistEntry[]> {
    return [...waitlistEntries];
  },

  /**
   * Count total entries
   */
  async count(): Promise<number> {
    return waitlistEntries.length;
  },
};
