"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceReport = void 0;
const ts_sequelize_models_1 = require("ts-sequelize-models");
class BalanceReport extends ts_sequelize_models_1.sequelizeModel {
    getAttributes(DataTypes) {
        return {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userMombile: {
                type: DataTypes.STRING,
            },
            userName: {
                type: DataTypes.STRING,
            },
            totalSentAmount: {
                type: DataTypes.DECIMAL,
            },
        };
    }
    getOptions() {
        return {
            timestamps: false,
            tableName: 'BalanceReports'
        };
    }
}
exports.BalanceReport = BalanceReport;
//# sourceMappingURL=balancereport.js.map