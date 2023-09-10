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
        validate: {
          isLibyanMobile: function (value:string) {
            if (!/^(\+218|0)?[1-9]\d{8}$/.test(value)) {
              throw new Error(
                "Invalid Libyan mobile number. It should start with +218 or 0, followed by 9 digits."
              );
            }
          },
        }
      },
      receiverMobile: { 
        type: DataTypes.STRING,
        validate: {
          isLibyanMobile: function (value:string) {
            if (!/^(\+218|0)?[1-9]\d{8}$/.test(value)) {
              throw new Error(
                "Invalid Libyan mobile number. It should start with +218 or 0, followed by 9 digits."
              );
            }
          },
        }
      },
      balance: { 
        type: DataTypes.DECIMAL,
        validate: {
          isPositiveDecimal: function (value:number) {
            if (value <= 0) {
              throw new Error('Balance must be a positive decimal value.');
            }
          },
        }
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
