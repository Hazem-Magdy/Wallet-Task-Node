import { DefineAttributes, DefineOptions, DataTypes } from 'sequelize';
import { sequelizeModel } from 'ts-sequelize-models';
import { actionModel, userModel, userActionsModel } from '../helpers/DataBaseConnection';

export class UserActions extends sequelizeModel {
  getAttributes(DataTypes: DataTypes): DefineAttributes {
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

  getOptions(): DefineOptions<any> {
    return {
      timestamps: false,
      tableName: 'UserActions',
    };
  }

  associate(): void {
    // Define the association between UserActions and User
    userActionsModel.belongsTo(userModel, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    // Define the association between UserActions and Action
    userActionsModel.belongsTo(actionModel, {
      foreignKey:{name:'roleId'} ,
      as:"userActions"
    });
  }
}
