import { Sequelize, FindOptions } from "sequelize";
import { User } from "../models/user";
const { transactionModel, userModel } = require("../Helpers/DataBaseConnection");
class AdminService {
  private sequelizeInstance: Sequelize;

  constructor(sequelizeInstance: Sequelize) {
    this.sequelizeInstance = sequelizeInstance;
  }
  
  async getBalanceReportAsync(): Promise<any[]> {
    try {
      const balanceReports = await userModel.findAll({
        attributes: ["mobile", "name"],
        include: [
          {
            model: transactionModel,
            as: "SentTransactions",
            attributes: [
              [
                this.sequelizeInstance.fn(
                  "SUM",
                  this.sequelizeInstance.col("amount")
                ),
                "TotalSentAmount",
              ],
            ],
            where: { senderUserId: this.sequelizeInstance.col("User.id") },
          },
        ],
      } as FindOptions<User>);

      return balanceReports;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default AdminService;
