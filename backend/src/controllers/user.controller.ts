import express from 'express'
import UserModel from '../models/user'

import multer from 'multer';
import path from 'path';
import { Console, error } from 'console';
import { sha3_512 } from 'js-sha3';

const imageStorage = multer.diskStorage({
    destination: './profileImages',
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: imageStorage,
    fileFilter: (req, file, cb) => {
        const filetypes = /(jpeg)|(jpg)|(png)/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            return cb(null, true);
        } else {
            cb(new Error("Samo slike u JPG ili PNG formatu su dozvoljene"));
        }
    }
}).single('slika');

export class UserController{

    login = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        let lozinka = sha3_512(req.body.lozinka);
    


        UserModel.findOne({korisnicko_ime : korisnicko_ime,
            lozinka: lozinka}).then((korisnik)=>{
                res.json(korisnik)
            }).catch((err)=>{
                console.log(err)
            })
    }

    getByUsername = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
    
        UserModel.findOne({korisnicko_ime : korisnicko_ime}).then((korisnik)=>{
                res.json(korisnik)
            }).catch((err)=>{
                console.log(err)
            })
    }

    getByMail = (req: express.Request, res: express.Response)=>{
        let mejl = req.body.mejl;
    
        UserModel.findOne({'mejl' : mejl}).then((korisnik)=>{
                res.json(korisnik)
            }).catch((err)=>{
                console.log(err)
            })
    }

    getAllDecorators = (req: express.Request, res: express.Response)=>{
        UserModel.find({'tip' : 'dekorater'}).then(gosti => {
            res.json(gosti)
        }).catch( err => {
            console.log(err)
        })
    }

    getAllOwners = (req: express.Request, res: express.Response)=>{
        UserModel.find({'tip' : 'vlasnik'}).then(gosti => {
            res.json(gosti)
        }).catch( err => {
            console.log(err)
        })
    }
    
    getAllUnregistered = (req: express.Request, res: express.Response)=>{
        UserModel.find({'tip' : 'neregistrovan'}).then(gosti => {
            res.json(gosti)
        }).catch( err => {
            console.log(err)
        })
    }

    addUser = (req: express.Request, res: express.Response) => {
        let korisnik = new UserModel(req.body.korisnik)

        korisnik.lozinka = sha3_512(korisnik.lozinka as string)

        korisnik.save().then(resp =>{
            if(resp != null){
                res.json({text : "Uspesno dodat korisnik!"})
            }
        }).catch((err) => {
            console.log(err)
            res.json({text : "Greska pri dodavanju!"})
        })
    }

    acceptUser = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime
    
        UserModel.findOneAndUpdate({'korisnicko_ime' : korisnicko_ime}, {'tip' : 'vlasnik'}).then(resp =>{
            res.json({text : "Korisnik odobren!"})
        }).catch( (err) => {
            res.json({text : "Greska pri odobrenju korisnika!"})
            console.log(err)
        })
    }

    denyUser = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime
    
        UserModel.findOneAndUpdate({'korisnicko_ime' : korisnicko_ime}, {'tip' : 'odbijen'}).then(resp =>{
            res.json({text : "Korisnik odbijen!"})
        }).catch( (err) => {
            res.json({text : "Greska pri odobredju korisnika!"})
            console.log(err)
        })
    }

    //CHANGE

    changePassword = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        let lozinka = sha3_512(req.body.lozinka);
    
        UserModel.findOneAndUpdate({korisnicko_ime : korisnicko_ime}, {'lozinka' : lozinka}).then((korisnik)=>{
                res.json({text : "Uspesno ste azurirali lozinku!"})
            }).catch((err)=>{
                res.json({text : "Greska pri azuriranju lozinku!"})
                console.log(err)
            })
    }

    changeMail = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        let mejl = req.body.mejl;
    
        UserModel.findOneAndUpdate({korisnicko_ime : korisnicko_ime}, {'mejl' : mejl}).then((korisnik)=>{
                res.json({text : "Uspesno ste azurirali e-mail adresu!"})
            }).catch((err)=>{
                res.json({text : "Greska pri azuriranju e-mail adrese!"})
                console.log(err)
            })
    }

    changeCardNumber = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        let broj_kreditne_kartice = req.body.broj_kreditne_kartice;
    
        UserModel.findOneAndUpdate({korisnicko_ime : korisnicko_ime}, {'broj_kreditne_kartice' : broj_kreditne_kartice}).then((korisnik)=>{
                res.json({text : "Uspesno ste azurirali broj kreditne kartice"})
            }).catch((err)=>{
                res.json({text : "Greska pri azuriranju broja kreditne kartice!"})
                console.log(err)
            })
    }

    changePhoneNumber = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        let broj_telefona = req.body.broj_telefona;
    
        UserModel.findOneAndUpdate({korisnicko_ime : korisnicko_ime}, {'broj_telefona' : broj_telefona}).then((korisnik)=>{
                res.json({text : "Uspesno ste azurirali broj telefona"})
            }).catch((err)=>{
                res.json({text : "Greska pri azuriranju broja telefona!"})
                console.log(err)
            })
    }

    changeAdress = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        let adresa = req.body.adresa;
    
        UserModel.findOneAndUpdate({korisnicko_ime : korisnicko_ime}, {'adresa' : adresa}).then((korisnik)=>{
                res.json({text : "Uspesno ste azurirali adresu"})
            }).catch((err)=>{
                res.json({text : "Greska pri azuriranju adrese!"})
                console.log(err)
            })
    }

    changeLastname = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        let prezime = req.body.prezime;
    
        UserModel.findOneAndUpdate({korisnicko_ime : korisnicko_ime}, {'prezime' : prezime}).then((korisnik)=>{
                res.json({text : "Uspesno ste azurirali prezime"})
            }).catch((err)=>{
                res.json({text : "Greska pri azuriranju prezimena!"})
                console.log(err)
            })
    }
    
    changeFirstname = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        let ime = req.body.ime;
    
        UserModel.findOneAndUpdate({korisnicko_ime : korisnicko_ime}, {'ime' : ime}).then((korisnik)=>{
                res.json({text : "Uspesno ste azurirali ime"})
            }).catch((err)=>{
                res.json({text : "Greska pri azuriranju imena!"})
                console.log(err)
            })
    }

    changeImage = (req: express.Request, res: express.Response)=>{
        upload(req, res, error => {
            if(error){
                
            }else{
                let imagePath = req.file?.path
                console.log(imagePath)
                //nalepi na polje slika
                let korisnicko_ime = req.body.korisnicko_ime
                //zahtev za bazu da nalepi imagePath u slika
                UserModel.findOneAndUpdate({korisnicko_ime : korisnicko_ime}, {'slika' : imagePath}).then((korisnik)=>{
                    res.json({text : "Uspesno ste azurirali sliku!"})
                }).catch((err)=>{
                    res.json({text : "Greska pri azuriranju slike!"})
                    console.log(err)
                })
            }
        })

    }

    //KRAJ
}