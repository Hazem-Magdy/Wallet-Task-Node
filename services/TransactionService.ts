import { IUser } from '../interfaces/models/User-Interface';
import UserRepository from '../repositories/UserRepository ';
import TransactionRepository from '../repositories/TransactionRepository ';
import { TransactionReportDTO } from '../dtos/TransactionReportDTO';
import { transactionModel } from '../helpers/DataBaseConnection';

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
        senderMobile: senderUser.mobile,
        receiverMobile:receiverUser.mobile,
        balance: senderUser.balance,
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
  static async generateBalanceReport(): Promise<TransactionReportDTO[]> {
    try {
      const transactions = await transactionModel.findAll({
        attributes: ['id', 'senderMobile', 'receiverMobile', 'balance'],
      });

      // Format the data into the DTO
      const reportData: TransactionReportDTO[] = transactions.map((transaction) => ({
        id: transaction.id,
        senderMobile: transaction.senderMobile,
        receiverMobile: transaction.receiverMobile,
        balance: transaction.balance,
      }));

      return reportData;
    } catch (error) {
      throw new Error('Error generating transaction report');
    }
  }
}

export default TransactionService;