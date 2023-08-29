 import { Request, Response } from 'express';
 import AdminService from '../services/AdminService';
 const { sequelize } = require("../Helpers/DataBaseConnection");
 
 const adminService = new AdminService(sequelize);
 
 async function getBalanceReport(req: Request, res: Response) {
   try {
     const balanceReports = await adminService.getBalanceReportAsync();
     return res.status(200).json(balanceReports);
   } catch (error) {
     console.error(error);
     return res.status(500).json({ message: 'An error occurred while fetching the balance report.' });
   }
 }

export { getBalanceReport };
