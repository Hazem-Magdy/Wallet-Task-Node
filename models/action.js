"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const ts_sequelize_models_1 = require("ts-sequelize-models");
const DataBaseConnection_1 = require("../helpers/DataBaseConnection");
class Action extends ts_sequelize_models_1.sequelizeModel {
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
            }
        };
    }
    getOptions() {
        return {
            timestamps: false,
            tableName: "Actions",
        };
    }
    associate() {
        DataBaseConnection_1.actionModel.hasMany(DataBaseConnection_1.userActionsModel, {
            foreignKey: {
                name: 'roleId'
            },
            as: 'userActions'
        });
    }
}
exports.Action = Action;
//# sourceMappingURL=action.js.map