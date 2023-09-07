"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const ts_sequelize_models_1 = require("ts-sequelize-models");
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
                    is: /^[a-zA-Z]+$/
                }
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
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM('Admin', 'User'),
            },
        };
    }
    getOptions() {
        return {
            timestamps: false,
            tableName: 'Users'
        };
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map