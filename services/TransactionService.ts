import { IUser } from '../Helpers/User-Interface';
import UserRepository from '../repositories/UserRepository ';
import TransactionRepository from '../repositories/TransactionRepository ';

class TransactionService {
  private userRepository: UserRepository;
  private transactionRepository: TransactionRepository;

  constructor(userRepository: UserRepository, transactionRepository: TransactionRepository) {
    this.userRepository = userRepository;
    this.transactionRepository = transactionRepository;
  }

  async transferBalance(senderUser: IUser, receiverUser: IUser, amount: number): Promise<boolean> {
    try {
      if (senderUser.balance < amount) {
        return false;
      }

      senderUser.balance -= amount;
      receiverUser.balance += amount;

      const transactionRecord = {
        name: senderUser.name,
        mobile: senderUser.mobile,
        balance: senderUser.balance,
        role: senderUser.role,
      };

      await this.userRepository.beginTransactionAsync();

      const updateSenderResult = await this.userRepository.updateUserAsync(senderUser);
      const updateReceiverResult = await this.userRepository.updateUserAsync(receiverUser);
      const addTransactionResult = await this.transactionRepository.addTransactionAsync(transactionRecord);

      if (updateSenderResult && updateReceiverResult && addTransactionResult) {
        await this.userRepository.commitTransactionAsync();
        return true;
      } else {
        this.userRepository.rollbackTransaction();
        return false; 
      }
    } catch (error) {
      this.userRepository.rollbackTransaction();
      console.error(error);
      return false; 
    }
  }
}

export default TransactionService;
