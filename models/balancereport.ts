import { DefineAttributes, DataTypes, DefineOptions } from 'sequelize';
import { sequelizeModel } from 'ts-sequelize-models';

export class BalanceReport extends sequelizeModel {
  getAttributes(DataTypes: DataTypes): DefineAttributes {
    return {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userMombile: {
        type: DataTypes.STRING,
      },
      userName: {
        type: DataTypes.STRING,
      },
      totalSentAmount: {
        type: DataTypes.DECIMAL,
      },
    };
  }

  getOptions(): DefineOptions<any> {
    return {
      timestamps: false,
      tableName: 'BalanceReports'
    };
  }
}
