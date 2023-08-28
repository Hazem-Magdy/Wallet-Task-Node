import express from 'express';
const router = express.Router();

import * as adminController from '../controllers/adminController';

// Balance report route
router.get('/balance-report', adminController.getBalanceReport);

export default router;
