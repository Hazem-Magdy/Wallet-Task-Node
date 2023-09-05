import { DefineAttributes, DataTypes, DefineOptions } from 'sequelize';
import { sequelizeModel } from 'ts-sequelize-models';

export class country extends sequelizeModel {

    getAttributes(DataTypes: DataTypes): DefineAttributes | any {
        return {
            strId: {
                type: DataTypes.STRING,
            },

            abbreviation: {
                type: DataTypes.STRING,
            },

            code: {
                type: DataTypes.STRING,
            },
            nameEn: {
                type: DataTypes.STRING,
            },
            nameAr: {
                type: DataTypes.STRING,
            }
        };
    }
    getOptions(): DefineOptions<any> {
        return {
            tableName: 'country'
        };
    }
}
