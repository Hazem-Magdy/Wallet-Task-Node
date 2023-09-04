"use strict";
// import express from 'express';
// const router =express.Router();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { CountryController } from '../controllers/CountryController';
// const countryControllerInstance = new CountryController();
// // getAllCountries route
// router.get('/list',(req:_Request,res:_Response)=>{
//      countryControllerInstance.getAllCountries(req,res);
// });
// export default router;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const CountryController_1 = require("../controllers/CountryController");
const countryControllerInstance = new CountryController_1.CountryController();
// getAllCountries route
router.get('/list', (req, res) => {
    countryControllerInstance.getAllCountries(req, res);
});
router.post('/create', (req, res) => {
    countryControllerInstance.createCountry(req, res);
});
exports.default = router;
