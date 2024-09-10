import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Job = new Schema({

    id : {type : Number},
    vlasnik : {type : String},
    firma : {type : String},
    dekorater : {type : String},
    komentar : {type : String},
    ocena : {type : Number},
    kvadratura_baste : {type : Number},
    kvadratura_plava : {type : Number},
    kvadratura_zelena : {type : Number},
    kvadratura_braon : {type : Number},
    broj_stolova : {type : Number},
    broj_stolica : {type : Number},
    tip_baste : {type : String},
    dodatni_zahtevi : {type : String},
    lista_usluga : {type : Array},
    status : {type : String},
    datum_kraja_radova : {type : String},
    broj_fontana : {type : Number},
    broj_bazena : {type : Number}
    
})

export default mongoose.model('Jobs', Job, 'poslovi')