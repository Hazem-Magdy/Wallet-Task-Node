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
            },
            receiverMobile: {
                type: DataTypes.STRING,
            },
            balance: {
                type: DataTypes.DECIMAL,
            }
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