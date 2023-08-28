import { DefineAttributes,DataTypes,DefineOptions } from 'sequelize';
import { sequelizeModel } from 'ts-sequelize-models';

export class Transaction extends sequelizeModel {
  getAttributes(DataTypes: DataTypes): DefineAttributes {
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
      role: {
        type: DataTypes.ENUM('Admin', 'User'),
      },
    };
  }

  getOptions(): DefineOptions<any> {
    return {
      timestamps: false,
      tableName: 'Transactions',
    };
  }
}
