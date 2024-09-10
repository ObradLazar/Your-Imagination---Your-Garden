import express from 'express';
import { CompanyController } from '../controllers/company.controller';

const comapnyRouter = express.Router();

//-----GET-----

comapnyRouter.route("/getAllCompanies").get(
    (req,res)=>new CompanyController().getAllCompanies(req,res)
)

comapnyRouter.route("/searchCompanies").post(
    (req,res)=>new CompanyController().searchCompanies(req,res)
)

comapnyRouter.route("/getCompanyByName").post(
    (req,res)=>new CompanyController().getCompanyByName(req,res)
)
//-----ADD-----

comapnyRouter.route("/addCompany").post(
    (req,res)=>new CompanyController().addCompany(req,res)
)

export default comapnyRouter;