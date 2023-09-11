"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const ts_sequelize_models_1 = require("ts-sequelize-models");
const DataBaseConnection_1 = require("../helpers/DataBaseConnection");
//import { roleModel } from '../Helpers/DataBaseConnection';
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
                validate: {
                    isOnlyLetters: function (value) {
                        if (!/^[a-zA-Z]+$/.test(value)) {
                            throw new Error('Name must only contain letters (no digits, special characters, or spaces).');
                        }
                    },
                },
            },
            mobile: {
                type: DataTypes.STRING,
                validate: {
                    isLibyanMobile: function (value) {
                        if (!/^(\+218|0)?[1-9]\d{8}$/.test(value)) {
                            throw new Error("Invalid Libyan mobile number. It should start with +218 or 0, followed by 9 digits.");
                        }
                    },
                },
            },
            balance: {
                type: DataTypes.DECIMAL,
                validate: {
                    isPositiveDecimal: function (value) {
                        if (value <= 0) {
                            throw new Error('Balance must be a positive decimal value.');
                        }
                    },
                },
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
    static associate(models) {
        // Define the association between User and Role
        DataBaseConnection_1.userModel.belongsTo(DataBaseConnection_1.roleModel, {
            foreignKey: 'roleId',
            onDelete: 'CASCADE',
        });
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map