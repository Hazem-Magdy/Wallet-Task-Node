"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const ts_sequelize_models_1 = require("ts-sequelize-models");
const DataBaseConnection_1 = require("../helpers/DataBaseConnection");
class Role extends ts_sequelize_models_1.sequelizeModel {
    getAttributes(DataTypes) {
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
                    isValidName: function (value) {
                        if (value !== "Admin" && value !== "User") {
                            throw new Error('Invalid role name. The name must be either "Admin" or "User".');
                        }
                    },
                },
            },
        };
    }
    getOptions() {
        return {
            timestamps: false,
            tableName: "Roles",
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
    static associate(models) {
        // Define the many-to-many association between Role and User
        DataBaseConnection_1.roleModel.belongsToMany(DataBaseConnection_1.userModel, {
            through: "UserRoles",
            foreignKey: "roleId",
            otherKey: "userId",
            as: 'Roles',
        });
    }
}
exports.Role = Role;
//# sourceMappingURL=role.js.map