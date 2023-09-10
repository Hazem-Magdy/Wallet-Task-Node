import { DefineAttributes, DataTypes, DefineOptions, Model } from 'sequelize';
import { sequelizeModel } from 'ts-sequelize-models';
import { userModel } from '../helpers/DataBaseConnection';
//import { roleModel } from '../Helpers/DataBaseConnection';

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
        validate: {
          isOnlyLetters: function (value:string) {
            if (!/^[a-zA-Z]+$/.test(value)) {
              throw new Error('Name must only contain letters (no digits, special characters, or spaces).');
            }
          },
        },
      },
      mobile: {
        type: DataTypes.STRING,
        validate: {
          isLibyanMobile: function (value:string) {
            if (!/^(\+218|0)?[1-9]\d{8}$/.test(value)) {
              throw new Error(
                "Invalid Libyan mobile number. It should start with +218 or 0, followed by 9 digits."
              );
            }
          },
        },
      },
        balance: {
          type: DataTypes.DECIMAL,
          validate: {
            isPositiveDecimal: function (value:number) {
              if (value <= 0) {
                throw new Error('Balance must be a positive decimal value.');
              }
            },
          },
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

  // static associate(models: any): void {
  //   // Define the association between User and Role
  //   userModel.belongsTo(roleModel, {
  //     foreignKey: 'roleId', 
  //     onDelete: 'CASCADE',
  //   });
  // }

  // static associate(models: any,userModel:Model<any, any>): void {
  //   userModel.belongsToMany(models.Role, {
  //     through: 'UserRoles', 
  //     foreignKey: 'userId', 
  //     otherKey: 'roleId',   
  //   });
  // }
  // static associate(models: any): void {
  //   // Define the association between User and Role
  //   userModel.belongsTo(models.Role, {
  //     foreignKey: 'roleId', // The foreign key in the User model
  //     onDelete: 'CASCADE',
  //   });
  // }
}
