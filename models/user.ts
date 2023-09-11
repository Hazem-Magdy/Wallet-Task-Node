import { DefineAttributes, DataTypes, DefineOptions, Model } from 'sequelize';
import { sequelizeModel } from 'ts-sequelize-models';
import { userActionsModel, userModel } from '../helpers/DataBaseConnection';

export class User extends sequelizeModel {
  getAttributes(DataTypes: DataTypes): DefineAttributes {
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
    }};
  

  getOptions(): DefineOptions<any> {
    return {
      timestamps: false,
      tableName: 'Users',
    };
  }

  associate(): any {
    userModel.hasMany(userActionsModel, {
      foreignKey: {
        name: 'userId'
      },
      as: 'userActions'
    });
  }
}
