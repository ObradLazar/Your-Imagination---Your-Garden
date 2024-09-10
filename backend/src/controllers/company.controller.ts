import express from 'express'
import CompanyModel from '../models/company'

export class CompanyController{

    //-----GET-----

    getAllCompanies = (req: express.Request, res: express.Response)=>{
        CompanyModel.find({}).then(firme => {
            res.json(firme)
        }).catch( err => {
            console.log(err)
        })
    }

    getCompanyByName = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv;

        CompanyModel.findOne({naziv : naziv}).then(firma => {
            res.json(firma)
        }).catch( err => {
            console.log(err)
        })
    }

    searchCompanies = (req: express.Request, res: express.Response)=>{
        let seachParam = req.body.seachParam;
        
        CompanyModel.find({
            $or: [
                { naziv: { $regex: seachParam, $options: 'i'}},
                { adresa: { $regex: seachParam, $options: 'i'}}
            ]
        }).then(firme => {
            res.json(firme)
        }).catch( err => {
            console.log(err)
        })
    }

    //-----ADD-----
    addCompany = (req: express.Request, res: express.Response)=>{
        let company = new CompanyModel(req.body.nova_firma)
    
        company.save().then(resp => {
            res.json({text : "Firma uspesno dodat!"})
        }).catch(err => {
            res.json({text : "Neuspesno dodavanje firme!"})
            console.log(err)
        })
    }


}