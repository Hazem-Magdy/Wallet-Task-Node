import { Language } from "../../enums/language";
import { countryModel } from "../../helpers/DataBaseConnection";
import { Request ,Response} from 'express'
export class CountryController {
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

    async getAllCountries(req:Request, res:Response) {
        try {
            const countries = await countryModel.findAll({ raw: true });
    
            if (countries.length > 0) {
                return res.status(200).json({ isSuccess: true, result: countries });
            } else {
                return res.status(400).json({ isSuccess: false, error: "No countries available." });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ isSuccess: false, error: "Internal Server Error" });
        }
    }
    
    async createCountry(req: Request, res: Response) {
        try {
            const { strId, abbreviation, code, nameEn, nameAr } = req.body;
            const newCountry = await countryModel.create({
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
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                isSuccess: false,
                error: "Internal Server Error"
            });
        }
    }
}

module.exports = { CountryController }
