// import express from 'express';
// const router =express.Router();

// import { CountryController } from '../controllers/CountryController';
// const countryControllerInstance = new CountryController();

// // getAllCountries route
// router.get('/list',(req:_Request,res:_Response)=>{
//      countryControllerInstance.getAllCountries(req,res);
// });
// export default router;


import express , { Request,Response }  from 'express';
const router =express.Router();

import {CountryController}  from '../controllers/CountryController';
const countryControllerInstance = new CountryController();

// getAllCountries route
router.get('/list',(req:Request,res:Response)=>{
     countryControllerInstance.getAllCountries(req,res);
});

router.post('/create',(req:Request,res:Response)=>{
     countryControllerInstance.createCountry(req,res);
});

export default router;
