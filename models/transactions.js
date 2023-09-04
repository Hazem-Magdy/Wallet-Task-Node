"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const ts_sequelize_models_1 = require("ts-sequelize-models");
class Transaction extends ts_sequelize_models_1.sequelizeModel {
    getAttributes(DataTypes) {
        return {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            mobile: {
                type: DataTypes.STRING,
                validate: {
                    is: /^(\+20|0)?1\d{9}$/
                }
            },
            balance: {
                type: DataTypes.DECIMAL,
                validate: {
                    min: 0
                }
            },
            role: {
                type: DataTypes.ENUM('Admin', 'User'),
            },
        };
    }
    getOptions() {
        return {
            timestamps: false,
            tableName: 'Transactions',
        };
    }
}
exports.Transaction = Transaction;
