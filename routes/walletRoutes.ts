import express from 'express';
const router = express.Router();

import * as walletController from '../controllers/walletController';

// Transfer route
router.post('/transfer', walletController.transfer);

export default router;
