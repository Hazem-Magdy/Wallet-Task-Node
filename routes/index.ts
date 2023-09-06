import express from 'express';
const router = express.Router();

import accountRoutes from './accountRoutes';
import walletRoutes from './walletRoutes';
import adminRoutes from './adminRoutes';
import countryRoutes from './countryRoutes'
import { applyPolicy } from '../middlewares/policyMiddleware';

let webBaseUrl = '/api/v1/web';

router.use(`${webBaseUrl}`,applyPolicy);
router.use(`${webBaseUrl}/Account`, accountRoutes);
router.use(`${webBaseUrl}/Wallet`, walletRoutes);
router.use(`${webBaseUrl}/Admin`, adminRoutes);
router.use(`${webBaseUrl}/Country`, countryRoutes);

export default router;
