import { Sequelize } from 'sequelize';
import{ Transaction } from '../models/transactions';
import{ User } from '../models/user';
import{ country } from '../models/country';
import { Role } from '../models/role';
import { UserRoles } from '../models/userRoles';

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

const roleModel = sequelize.define(
  "Role",
  new Role().getAttributes(sequelize.Sequelize),
  new Role().getOptions()
);

const userRolesModel = sequelize.define(
  "UserRoles",
  new UserRoles().getAttributes(sequelize.Sequelize),
  new UserRoles().getOptions()
);

export { sequelize, transactionModel, userModel , countryModel , roleModel, userRolesModel };





