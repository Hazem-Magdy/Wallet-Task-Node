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
            senderMobile: {
                type: DataTypes.STRING,
                validate: {
                    isLibyanMobile: function (value) {
                        if (!/^(\+218|0)?[1-9]\d{8}$/.test(value)) {
                            throw new Error("Invalid Libyan mobile number. It should start with +218 or 0, followed by 9 digits.");
                        }
                    },
                }
            },
            receiverMobile: {
                type: DataTypes.STRING,
                validate: {
                    isLibyanMobile: function (value) {
                        if (!/^(\+218|0)?[1-9]\d{8}$/.test(value)) {
                            throw new Error("Invalid Libyan mobile number. It should start with +218 or 0, followed by 9 digits.");
                        }
                    },
                }
            },
            balance: {
                type: DataTypes.DECIMAL,
                validate: {
                    isPositiveDecimal: function (value) {
                        if (value <= 0) {
                            throw new Error('Balance must be a positive decimal value.');
                        }
                    },
                }
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
//# sourceMappingURL=transactions.js.map