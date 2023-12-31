"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const ts_sequelize_models_1 = require("ts-sequelize-models");
const DataBaseConnection_1 = require("../helpers/DataBaseConnection");
class User extends ts_sequelize_models_1.sequelizeModel {
    getAttributes(DataTypes) {
        return {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            mobile: {
                type: DataTypes.STRING,
            },
            balance: {
                type: DataTypes.DECIMAL,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        };
    }
    ;
    getOptions() {
        return {
            timestamps: false,
            tableName: 'Users',
        };
    }
    associate() {
        DataBaseConnection_1.userModel.hasMany(DataBaseConnection_1.userActionsModel, {
            foreignKey: {
                name: 'userId'
            },
            as: 'userActions'
        });
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map