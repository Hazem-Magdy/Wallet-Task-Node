"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.country = void 0;
const ts_sequelize_models_1 = require("ts-sequelize-models");
class country extends ts_sequelize_models_1.sequelizeModel {
    getAttributes(DataTypes) {
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
            nameFr: {
                type: DataTypes.STRING,
            },
            nameAr: {
                type: DataTypes.STRING,
            }
        };
    }
    getOptions() {
        return {
            tableName: 'country'
        };
    }
}
exports.country = country;
