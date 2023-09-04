import express from 'express';
const router = express.Router();

import accountRoutes from './accountRoutes';
import walletRoutes from './walletRoutes';
import adminRoutes from './adminRoutes';
import countryRoutes from './countryRoutes'

router.use('/api/account', accountRoutes);
router.use('/api/wallet', walletRoutes);
router.use('/api/admin', adminRoutes);
router.use('/api/country', countryRoutes);

export default router;
