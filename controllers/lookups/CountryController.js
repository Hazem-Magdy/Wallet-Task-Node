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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryController = void 0;
const DataBaseConnection_1 = require("../../Helpers/DataBaseConnection");
class CountryController {
    // async getAllCountries(req: Request, res: Response) {
    //     let countries = await countryModel.findAll({ raw: true })
    //     let language = req.headers.language ? req.headers.language.toString() : "ar";
    //     countries.map(item => item.name = language === Language.AR ? item.nameAr : item.nameEn)
    //     let result = countries.map(({ nameAr, nameEn, ...items }) => items);
    //     if (result.length > 0) {
    //         console.log()
    //         return res.send({ status: 200, result: result });
    //     }
    //     else {
    //         let response = {
    //             isSuccess: false,
    //             //error: new TrxHelpers().handleErrorResponseMessage(UtilService.translate('no_Countries')),
    //             error:"No countries available."
    //         };
    //         return res.status(400).send(response);
    //     }
    // }
    getAllCountries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const countries = yield DataBaseConnection_1.countryModel.findAll({ raw: true });
                if (countries.length > 0) {
                    return res.status(200).json({ isSuccess: true, result: countries });
                }
                else {
                    return res.status(400).json({ isSuccess: false, error: "No countries available." });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ isSuccess: false, error: "Internal Server Error" });
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
