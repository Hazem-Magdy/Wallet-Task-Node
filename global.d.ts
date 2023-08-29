// global.d.ts
// import { Sequelize, Model } from "sequelize";
// import { TransactionAttributes } from "../models/transactions";
// import { UserAttributes } from "../models/user";

// const sequelize = new Sequelize("WalletDB", "postgres", "0502349611", {
//   host: "localhost",
//   port: 5432,
//   dialect: "postgres",
// });

// const transactionModel = sequelize.define<TransactionAttributes>(
//   "Transaction",
//   new TransactionAttributes().getAttributes(sequelize.Sequelize),
//   new TransactionAttributes().getOptions()
// );

// const userModel = sequelize.define<UserAttributes>(
//   "User",
//   new UserAttributes().getAttributes(sequelize.Sequelize),
//   new UserAttributes().getOptions()
// );

// declare global {
//   namespace NodeJS {
//     interface Global {
//       sequelize: Sequelize;
//       transactionModel: Model<TransactionAttributes>;
//       userModel: Model<UserAttributes>;
//     }
//   }
// }

// export{}


// // global.d.ts

// import { Sequelize, Model } from 'sequelize';
// import { TransactionAttributes, Transaction } from './models/transactions';
// import { UserAttributes, User } from './models/user';

// const sequelize = new Sequelize("WalletDB", "postgres", "0502349611", {
//   host: "localhost",
//   port: 5432,
//   dialect: "postgres",
// });

// const transactionModel = sequelize.define<TransactionAttributes>(
//   "Transaction",
//   new TransactionAttributes().getAttributes(sequelize.Sequelize),
//   new TransactionAttributes().getOptions()
// );

// const userModel = sequelize.define<UserAttributes>(
//   "User",
//   new UserAttributes().getAttributes(sequelize.Sequelize),
//   new UserAttributes().getOptions()
// );

// declare global {
//   namespace NodeJS {
//     interface Global {
//       sequelize: Sequelize;
//       transactionModel: Model<Transaction, TransactionAttributes>;
//       userModel: Model<User, UserAttributes>;
//     }
//   }
// }


// import { Sequelize, Model, DataTypes } from 'sequelize';
// import { TransactionAttributes, Transaction } from './models/transactions';
// import { UserAttributes, User } from './models/user';

// declare global {
//   namespace NodeJS {
//     interface Global {
//       sequelize: Sequelize;
//       transactionModel: Model<Transaction, TransactionAttributes>;
//       userModel: Model<User, UserAttributes>;
//     }
//   }
// }

// // Initialize the variables
// export const sequelize = new Sequelize("WalletDB", "postgres", "0502349611", {
//   host: "localhost",
//   port: 5432,
//   dialect: "postgres",
// });

// export const transactionModel = global.sequelize.define<Transaction, TransactionAttributes>(
//   "Transaction",
//   new TransactionAttributes().getAttributes(DataTypes),
//   new TransactionAttributes().getOptions()
// );

// export const userModel = global.sequelize.define<User, UserAttributes>(
//   "User",
//   new UserAttributes().getAttributes(DataTypes),
//   new UserAttributes().getOptions()
// );

// global.d.ts
// declare global {
//   namespace NodeJS {
//     interface Global {
//       sequelize: typeof sequelize;
//       transactionModel: typeof transactionModel;
//       userModel: typeof userModel;
//     }
//   }
// }

// export {};

// const { Sequelize } = require("sequelize");
// import { Transaction } from "../models/transactions";
// import { User } from "../models/user";

// const sequelize = new Sequelize("WalletDB", "postgres", "0502349611", {
//   host: "localhost",
//   port: 5432,
//   dialect: "postgres",
// });

// const transactionModel = sequelize.define(
//   "Transaction",
//   new Transaction().getAttributes(sequelize),
//   new Transaction().getOptions()
// ) as import("./models/transactions").Transaction; 

// const userModel = sequelize.define(
//   "User",
//   new User().getAttributes(sequelize),
//   new User().getOptions()
// ) as import("./models/user").User;

// // Assign to global object
// global.sequelize = sequelize;
// global.transactionModel = transactionModel;
// global.userModel = userModel;
