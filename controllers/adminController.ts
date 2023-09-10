import { Request, Response } from 'express';
import TransactionService from '../services/TransactionService'; 

class AdminController {
  static  async generateBalanceReport(req: Request, res: Response): Promise<void> {
    try {
      const reportData = await TransactionService.generateBalanceReport();
      res.status(200).json(reportData);
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default AdminController;

