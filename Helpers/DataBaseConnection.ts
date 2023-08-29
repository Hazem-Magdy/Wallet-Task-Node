const { Sequelize } = require("sequelize");
const { Transaction } = require("../models/transactions");
const { User } = require("../models/user");

const sequelize = new Sequelize("WalletDB", "postgres", "0502349611", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

const transactionModel = sequelize.define(
  "Transaction",
  new Transaction().getAttributes(sequelize.DataTypes),
  new Transaction().getOptions()
);

const userModel = sequelize.define(
  "User",
  new User().getAttributes(sequelize.DataTypes),
  new User().getOptions()
);

module.exports = {
  sequelize,
  transactionModel,
  userModel,
};

