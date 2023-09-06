import express , { Request,Response }  from 'express';
const router = express.Router();

import {CountryController}  from '../controllers/lookups/CountryController';
const countryControllerInstance = new CountryController();

// getAllCountries route
router.get('/list',(req:Request,res:Response)=>{
     countryControllerInstance.getAllCountries(req,res);
});

// createCountry route
router.post('/create',(req:Request,res:Response)=>{
     countryControllerInstance.createCountry(req,res);
});

export default router;
