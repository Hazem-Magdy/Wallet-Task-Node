import { DefineAttributes, DefineOptions, DataTypes } from 'sequelize';
import { sequelizeModel } from 'ts-sequelize-models';

export class UserRoles extends sequelizeModel {
  getAttributes(DataTypes: DataTypes): DefineAttributes {
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

  getOptions(): DefineOptions<any> {
    return {
      timestamps: false,
      tableName: 'UserRoles',
    };
  }
}
