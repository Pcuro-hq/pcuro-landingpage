import { pool } from '../config/database';
import { WaitlistEntry, CreateWaitlistDTO } from '../types';

/**
 * Waitlist Repository
 * Handles data persistence for waitlist entries
 * Uses native pg library for PostgreSQL database operations
 */
export const waitlistRepository = {
  /**
   * Create a new waitlist entry
   */
  async create(data: CreateWaitlistDTO): Promise<WaitlistEntry> {
    const result = await pool.query(
      'INSERT INTO "Waitlist" ("fullName", "companyName", "email") VALUES ($1, $2, $3) RETURNING *',
      [data.fullName, data.companyName, data.email]
    );

    const row = result.rows[0];
    const entry: WaitlistEntry = {
      id: row.id, // UUID is already a string
      fullName: row.fullName,
      companyName: row.companyName,
      email: row.email,
      createdAt: row.createdAt,
    };
    
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
    const result = await pool.query(
      'SELECT * FROM "Waitlist" WHERE "email" = $1',
      [normalizedEmail]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id, // UUID is already a string
      fullName: row.fullName,
      companyName: row.companyName,
      email: row.email,
      createdAt: row.createdAt,
    };
  },

  /**
   * Find a waitlist entry by ID
   */
  async findById(id: string): Promise<WaitlistEntry | null> {
    // Validate UUID format (basic check)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    
    if (!uuidRegex.test(id)) {
      return null;
    }

    const result = await pool.query(
      'SELECT * FROM "Waitlist" WHERE "id" = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id, // UUID is already a string
      fullName: row.fullName,
      companyName: row.companyName,
      email: row.email,
      createdAt: row.createdAt,
    };
  },

  /**
   * Get all waitlist entries (for admin purposes)
   */
  async findAll(): Promise<WaitlistEntry[]> {
    const result = await pool.query(
      'SELECT * FROM "Waitlist" ORDER BY "createdAt" DESC'
    );
    
    return result.rows.map((row) => ({
      id: row.id, // UUID is already a string
      fullName: row.fullName,
      companyName: row.companyName,
      email: row.email,
      createdAt: row.createdAt,
    }));
  },

  /**
   * Count total entries
   */
  async count(): Promise<number> {
    const result = await pool.query('SELECT COUNT(*) FROM "Waitlist"');
    return parseInt(result.rows[0].count, 10);
  },
};
