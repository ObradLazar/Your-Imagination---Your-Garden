import express from 'express'
import JobModel from '../models/job'
import MaintenanceModel from '../models/maintenance'
import { text } from 'body-parser'

export class JobController{

    addJob = (req: express.Request, res: express.Response)=>{
        let job = new JobModel(req.body.posao)

        job.save().then(resp => {
            res.json({text : "Zahtev za posao poslat!"})
        }).catch(err => {
            res.json({text : "Neuspesno dodavanje firme!"})
            console.log(err)
        })
    }

    getAllJobs = (req: express.Request, res: express.Response)=>{
        JobModel.find({}).then(poslovi => {
            res.json(poslovi)
        }).catch( err => {
            console.log(err)
        })
    }

    getAllMyJobs = (req: express.Request, res: express.Response)=>{
        let vlasnik = req.body.vlasnik

        JobModel.find({vlasnik : vlasnik}).then(poslovi => {
            res.json(poslovi)
        }).catch( err => {
            console.log(err)
        })
    }

    getAllMyJobsAsDecorator = (req: express.Request, res: express.Response)=>{
        let dekorater = req.body.dekorater

        JobModel.find({dekorater : dekorater}).then(poslovi => {
            res.json(poslovi)
        }).catch( err => {
            console.log(err)
        })
    }

    getAllUnprocessedJobs = (req: express.Request, res: express.Response)=>{

        JobModel.find({status : "neobradjen"}).then(poslovi => {
            res.json(poslovi)
        }).catch( err => {
            console.log(err)
        })
    }

    acceptJobByDecorator = (req: express.Request, res: express.Response)=>{
        let dekorater = req.body.dekorater
        let id = req.body.id

        JobModel.findOneAndUpdate({id : id}, {'status' : "prihvaceno", 'dekorater' : dekorater}).then(resp =>{
            res.json({text : "Posao odobren!"})
        }).catch( (err) => {
            res.json({text : "Greska pri odobrenju posla!"})
            console.log(err)
        })

    }

    denyJobByDecorator = (req: express.Request, res: express.Response)=>{
        let dekorater = req.body.dekorater
        let id = req.body.id
        let komentar = req.body.komentar

        JobModel.findOneAndUpdate({id : id}, {'status' : "odbijeno", 'dekorater' : dekorater, 'komentar' : komentar}).then(resp =>{
            res.json({text : "Posao odbijen!"})
        }).catch( (err) => {
            res.json({text : "Greska pri odbijanju posla!"})
            console.log(err)
        })
    }

    finishJobByDecorator= (req: express.Request, res: express.Response)=>{
        let id = req.body.id

        JobModel.findOneAndUpdate({id : id}, {'status' : "zavrseno"}).then(resp =>{
            res.json({text : "Posao zavrsen!"})
        }).catch( (err) => {
            res.json({text : "Greska pri zatvaranju posla!"})
            console.log(err)
        })
    }


    //MAINTENANCE

    createMaintenance = (req: express.Request, res: express.Response)=>{
        let maintenance = new MaintenanceModel(req.body.maintenance)

        maintenance.save().then(resp => {
            res.json({text : "Poslat zahtev za odrzavanje!"})
        }).catch(err => {
            res.json({text : "Zahtev nije poslat!"})
            console.log(err)
        })
    }

    getAllMaintenanceUnprocessed = (req: express.Request, res: express.Response)=>{
        MaintenanceModel.find({"status" : "N"}).then(odrzavanja => {
            res.json(odrzavanja)
        }).catch( err => {
            console.log(err)
        })
    }

    getAllMaintenanceAccepted = (req: express.Request, res: express.Response)=>{
        MaintenanceModel.find({"status" : "P"}).then(odrzavanja => {
            res.json(odrzavanja)
        }).catch( err => {
            console.log(err)
        })
    }

    acceptMaintenance = (req: express.Request, res: express.Response)=>{
        let id_posla = req.body.id_posla
        let datum_izrade = req.body.datum_izrade
        let vreme_izrade = req.body.vreme_izrade

        MaintenanceModel.findOneAndUpdate({id_posla : id_posla},{'status' : 'P', datum_izrade : datum_izrade, vreme_izrade : vreme_izrade}).then(odrzavanja => {
            res.json({text : "Prihvaceno odrzavanje"})
        }).catch( err => {
            console.log(err)
        })
    }

    denyMaintenance = (req: express.Request, res: express.Response)=>{
        let id_posla = req.body.id_posla

        MaintenanceModel.findOneAndUpdate({id_posla : id_posla},{'status' : 'O'}).then(odrzavanja => {
            res.json({text : "Prihvaceno odrzavanje"})
        }).catch( err => {
            console.log(err)
        })
    }
}