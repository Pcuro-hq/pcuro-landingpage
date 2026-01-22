import { Request, Response } from 'express';
import { waitlistService } from '../services';
import { responseHelper } from '../utils';
import { CreateWaitlistDTO } from '../types';

/**
 * Waitlist Controller
 * Handles HTTP request/response for waitlist endpoints
 */
export const waitlistController = {
  /**
   * POST /api/waitlist
   * Add a new entry to the waitlist
   */
  async create(req: Request, res: Response): Promise<void> {
    const data: CreateWaitlistDTO = req.body;
    
    const result = await waitlistService.addToWaitlist(data);
    
    responseHelper.created(res, result);
  },

  /**
   * GET /api/waitlist/stats
   * Get waitlist statistics (admin use)
   */
  async getStats(_req: Request, res: Response): Promise<void> {
    const stats = await waitlistService.getStats();
    
    responseHelper.success(res, stats);
  },
};
