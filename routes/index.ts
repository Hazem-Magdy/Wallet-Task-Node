import express from 'express';
const router = express.Router();

import accountRoutes from './accountRoutes';
import walletRoutes from './walletRoutes';
import adminRoutes from './adminRoutes';

router.use('/api/account', accountRoutes);
router.use('/api/wallet', walletRoutes);
router.use('/api/admin', adminRoutes);

export default router;
