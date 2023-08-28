import { Request, Response } from 'express';
import { IUser } from '../Helpers/User-Interface';
import UserRepository from '../repositories/UserRepository ';
import TransactionRepository from '../repositories/TransactionRepository ';
import TransactionService from '../services/TransactionService';

const userRepository = new UserRepository();
const transactionRepository = new TransactionRepository();

const transactionService = new TransactionService(userRepository, transactionRepository);

async function transfer(req: Request, res: Response) {
  try {
    const { senderMobile, receiverMobile, amount } = req.body;

    const senderUser: IUser | null = await userRepository.getUserByMobileAsync(senderMobile);
    const receiverUser: IUser | null = await userRepository.getUserByMobileAsync(receiverMobile);

    if (!senderUser) {
      return res.status(400).json({ message: 'Sender user not found.' });
    }

    if (!receiverUser) {
      return res.status(400).json({ message: 'Receiver user not found.' });
    }

    const transferSuccess = await transactionService.transferBalance(senderUser, receiverUser, amount);

    if (transferSuccess) {
      return res.status(200).json({ message: 'Balance transfer successful.' });
    } else {
      return res.status(500).json({ message: 'An error occurred during balance transfer.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred.' });
  }
}

export { transfer };
