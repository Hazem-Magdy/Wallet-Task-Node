import { Transaction } from "sequelize";
import { IUser } from '../interfaces/models/User-Interface';
import { sequelize, userModel } from '../helpers/DataBaseConnection'

class UserRepository {
  private _transaction: Transaction | null = null;

  constructor() {}

  async getUserByIdAsync(userId: number): Promise<IUser | null> {
    return userModel.findByPk(userId);
  }

  async getUserByMobileAsync(mobile: string): Promise<IUser | null> {
    return userModel.findOne({ where: { mobile } });
  }

  async updateUserAsync(user: any): Promise<boolean> {
    await user.save();
    return true;
  }

  async beginTransactionAsync(): Promise<void> {
    this._transaction = await sequelize.transaction();
  }

  async commitTransactionAsync(): Promise<void> {
    if (this._transaction) {
      await this._transaction.commit();
      this._transaction = null;
    }
  }

  rollbackTransaction(): void {
    if (this._transaction) {
      this._transaction.rollback();
      this._transaction = null;
    }
  }
}

export default UserRepository;
