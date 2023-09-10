"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = void 0;
const ts_sequelize_models_1 = require("ts-sequelize-models");
class UserRoles extends ts_sequelize_models_1.sequelizeModel {
    getAttributes(DataTypes) {
        return {
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            roleId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: 'Roles',
                    key: 'id',
                },
            },
        };
    }
    getOptions() {
        return {
            timestamps: false,
            tableName: 'UserRoles',
        };
    }
}
exports.UserRoles = UserRoles;
//# sourceMappingURL=userRoles.js.map