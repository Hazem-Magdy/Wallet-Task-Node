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
      senderMobile: { 
        type: DataTypes.STRING,
      },
      receiverMobile: { 
        type: DataTypes.STRING,
      },
      balance: { 
        type: DataTypes.DECIMAL,
      }
    };
  }

  getOptions(): DefineOptions<any> {
    return {
      timestamps: false,
      tableName: 'Transactions',
    };
  }
}
