import express , { Request,Response }  from 'express';
const router =express.Router();
import checkUser from '../middlewares/authMiddleware'

import {CountryController}  from '../controllers/CountryController';
const countryControllerInstance = new CountryController();

// getAllCountries route
router.get('/list',checkUser,(req:Request,res:Response)=>{
     countryControllerInstance.getAllCountries(req,res);
});

router.post('/create',checkUser,(req:Request,res:Response)=>{
     countryControllerInstance.createCountry(req,res);
});

export default router;
