import { DefineAttributes, DataTypes, DefineOptions, Model } from 'sequelize';
import { sequelizeModel } from 'ts-sequelize-models';

export class Role extends sequelizeModel {
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
        validate: {
          isValidName: function (value:string) {
            if (value !== 'Admin' && value !== 'User') {
              throw new Error('Invalid role name. The name must be either "Admin" or "User".');
            }
          },
        },
      },
    };
  }

  getOptions(): DefineOptions<any> {
    return {
      timestamps: false,
      tableName: 'Roles',
    };
  }

  // static associate(models: any,roleModel:Model<any,any>): void {
  //   roleModel.belongsToMany(models.User, {
  //     through: 'UserRoles',
  //     foreignKey: 'roleId',
  //     otherKey: 'userId',
  //   });
  // }

  // static associate(models: any): void {
  //   // Define the association between Role and User
  //   roleModel.hasMany(models.User, {
  //     foreignKey: 'roleId', // The foreign key in the User model
  //     onDelete: 'CASCADE',
  //   });
  // }
  
}
