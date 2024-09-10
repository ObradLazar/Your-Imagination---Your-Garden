import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    korisnicko_ime: { type: String },
    lozinka: { type: String },
    ime: { type: String },
    prezime: { type: String },
    pol: { type: String },
    adresa: { type: String },
    slika: { type: String },
    tip: { type: String },
    broj_kreditne_kartice: { type: String },
    broj_telefona: { type: String },
    mejl: { type: String }
})

export default mongoose.model('User', User, 'korisnici')