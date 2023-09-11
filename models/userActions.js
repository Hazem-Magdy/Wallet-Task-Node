"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActions = void 0;
const ts_sequelize_models_1 = require("ts-sequelize-models");
const DataBaseConnection_1 = require("../helpers/DataBaseConnection");
class UserActions extends ts_sequelize_models_1.sequelizeModel {
    getAttributes(DataTypes) {
        return {
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            roleId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            }
        };
    }
    getOptions() {
        return {
            timestamps: false,
            tableName: 'UserActions',
        };
    }
    associate() {
        // Define the association between UserActions and User
        DataBaseConnection_1.userActionsModel.belongsTo(DataBaseConnection_1.userModel, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
        // Define the association between UserActions and Action
        DataBaseConnection_1.userActionsModel.belongsTo(DataBaseConnection_1.actionModel, {
            foreignKey: { name: 'roleId' },
            as: "userActions"
        });
    }
}
exports.UserActions = UserActions;
//# sourceMappingURL=userActions.js.map