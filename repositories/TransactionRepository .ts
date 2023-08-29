const { transactionModel } = require("../Helpers/DataBaseConnection");

class TransactionRepository {
  constructor() {}

  async addTransactionAsync(transaction: any): Promise<boolean> {
    try {
      await transactionModel.create(transaction);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

}

export default TransactionRepository;
