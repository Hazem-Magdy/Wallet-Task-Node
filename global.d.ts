const { Sequelize } = require("sequelize");
import { Transaction } from "../models/transactions";
import { User } from "../models/user";

const sequelize = new Sequelize("WalletDB", "postgres", "0502349611", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

const transactionModel = sequelize.define(
  "Transaction",
  new Transaction().getAttributes(sequelize),
  new Transaction().getOptions()
) as import("./models/transactions").Transaction; 

const userModel = sequelize.define(
  "User",
  new User().getAttributes(sequelize),
  new User().getOptions()
) as import("./models/user").User;

// Assign to global object
global.sequelize = sequelize;
global.transactionModel = transactionModel;
global.userModel = userModel;
