import express from 'express';
const router = express.Router();

import adminController from '../controllers/adminController';

// Balance report route
router.get('/balance-report', adminController.generateBalanceReport);

export default router;
