"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const ts_sequelize_models_1 = require("ts-sequelize-models");
class Role extends ts_sequelize_models_1.sequelizeModel {
    getAttributes(DataTypes) {
        return {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isValidName: function (value) {
                        if (value !== 'Admin' && value !== 'User') {
                            throw new Error('Invalid role name. The name must be either "Admin" or "User".');
                        }
                    },
                },
            },
        };
    }
    getOptions() {
        return {
            timestamps: false,
            tableName: 'Roles',
        };
    }
}
exports.Role = Role;
//# sourceMappingURL=role.js.map