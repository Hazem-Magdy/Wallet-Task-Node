import express from 'express';
const router = express.Router();

import * as accountController from '../controllers/accountController';

// Login and register routes
router.post('/login', accountController.login);
router.post('/register', accountController.register);

export default router;
