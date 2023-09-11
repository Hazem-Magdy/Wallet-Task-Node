import { DefineAttributes, DataTypes, DefineOptions, Model } from "sequelize";
import { sequelizeModel } from "ts-sequelize-models";
import { actionModel, userActionsModel } from "../helpers/DataBaseConnection";

export class Action extends sequelizeModel {
  getAttributes(DataTypes: DataTypes): DefineAttributes {
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

  getOptions(): DefineOptions<any> {
    return {
      timestamps: false,
      tableName: "Actions",
    };
  }

  associate(): any {
    actionModel.hasMany(userActionsModel, {
      foreignKey: {
        name: 'roleId'
      },
      as: 'userActions'
    });
  }
}
