import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Company = new Schema({
    naziv : {type : String},
    adresa : {type : String},
    lista_zaposlenih : {type : Array},
    ocene : {type : Array},
    lista_usluga : {type : Array},
    lista_komentara : {type : Array},
    pocetak_godisnjeg_odmora : {type : String},
    kraj_godisnjeg_odmora : {type : String},
    kontakt_telefon : {type : String},
    radno_vreme : {type : Array}
})

export default mongoose.model('Company', Company, 'firme')