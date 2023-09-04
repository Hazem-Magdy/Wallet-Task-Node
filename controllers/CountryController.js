"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryController = void 0;
const language_1 = require("../enums/language");
const DataBaseConnection_1 = require("../Helpers/DataBaseConnection");
class CountryController {
    getAllCountries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let countries = yield DataBaseConnection_1.countryModel.findAll({ raw: true });
            let language = req.headers.language ? req.headers.language.toString() : "ar";
            countries.map(item => item.name = language === language_1.Language.AR ? item.nameAr : item.nameEn);
            let result = countries.map((_a) => {
                var { nameAr, nameEn } = _a, items = __rest(_a, ["nameAr", "nameEn"]);
                return items;
            });
            if (result.length > 0) {
                console.log();
                return res.send({ status: 200, result: result });
            }
            else {
                let response = {
                    isSuccess: false,
                    //error: new TrxHelpers().handleErrorResponseMessage(UtilService.translate('no_Countries')),
                    error: "No countries available."
                };
                return res.status(400).send(response);
            }
        });
    }
    createCountry(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { strId, abbreviation, code, nameEn, nameAr } = req.body;
                const newCountry = yield DataBaseConnection_1.countryModel.create({
                    strId,
                    abbreviation,
                    code,
                    nameEn,
                    nameAr
                });
                return res.status(201).send({
                    isSuccess: true,
                    result: newCountry,
                    message: "Country created successfully."
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).send({
                    isSuccess: false,
                    error: "Internal Server Error"
                });
            }
        });
    }
}
exports.CountryController = CountryController;
module.exports = { CountryController };
