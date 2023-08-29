import { Sequelize } from 'sequelize';
import{ Transaction } from '../models/transactions';
import{ User } from '../models/user';


const sequelize = new Sequelize("WalletDB", "postgres", "0502349611", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

const transactionModel = sequelize.define(
  "Transaction",
  new Transaction().getAttributes(sequelize.Sequelize),
  new Transaction().getOptions()
);

const userModel = sequelize.define(
  "User",
  new User().getAttributes(sequelize.Sequelize),
  new User().getOptions()
);


export { sequelize, transactionModel, userModel };



// const globalProperties = {
//   mySequelize: sequelize,
//   myTransactionModel: transactionModel,
//   myUserModel: userModel,
// };

// // Assign your global properties to the global object
// Object.assign(global, globalProperties);

// export { sequelize, transactionModel, userModel };




