import { Sequelize } from 'sequelize';
import{ Transaction } from '../models/transactions';
import{ User } from '../models/user';
import{ country } from '../models/country';
import { Action } from '../models/action';
import { UserActions } from '../models/userActions';

const userActionsInstance = new UserActions();
const sequelize = new Sequelize("WalletDB", "postgres", "0502349611", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: console.log,
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

const countryModel = sequelize.define(
  "Country",
  new country().getAttributes(sequelize.Sequelize),
  new country().getOptions()
);

const actionModel = sequelize.define(
  "Action",
  new Action().getAttributes(sequelize.Sequelize),
  new Action().getOptions()
);

const userActionsModel = sequelize.define(
  "UserActions",
  new UserActions().getAttributes(sequelize.Sequelize),
  new UserActions().getOptions(),
);
new UserActions().associate();

export { sequelize, transactionModel, userModel , countryModel , actionModel, userActionsModel };





