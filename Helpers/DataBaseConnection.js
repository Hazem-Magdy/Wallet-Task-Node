"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRolesModel = exports.roleModel = exports.countryModel = exports.userModel = exports.transactionModel = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const transactions_1 = require("../models/transactions");
const user_1 = require("../models/user");
const country_1 = require("../models/country");
const role_1 = require("../models/role");
const userRoles_1 = require("../models/userRoles");
const sequelize = new sequelize_1.Sequelize("WalletDB", "postgres", "0502349611", {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: console.log,
});
exports.sequelize = sequelize;
const transactionModel = sequelize.define("Transaction", new transactions_1.Transaction().getAttributes(sequelize.Sequelize), new transactions_1.Transaction().getOptions());
exports.transactionModel = transactionModel;
const userModel = sequelize.define("User", new user_1.User().getAttributes(sequelize.Sequelize), new user_1.User().getOptions());
exports.userModel = userModel;
const countryModel = sequelize.define("Country", new country_1.country().getAttributes(sequelize.Sequelize), new country_1.country().getOptions());
exports.countryModel = countryModel;
const roleModel = sequelize.define("Role", new role_1.Role().getAttributes(sequelize.Sequelize), new role_1.Role().getOptions());
exports.roleModel = roleModel;
const userRolesModel = sequelize.define("UserRoles", new userRoles_1.UserRoles().getAttributes(sequelize.Sequelize), new userRoles_1.UserRoles().getOptions());
exports.userRolesModel = userRolesModel;
//# sourceMappingURL=DataBaseConnection.js.map