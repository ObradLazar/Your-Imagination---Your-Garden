import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Maintenance = new Schema({

    id_posla : {type : Number},
    status : {type : String},
    datum_izrade : {type : String},
    vreme_izrade : {type : String},
    firma : {type : String},
    vlasnik : {type : String}

})

export default mongoose.model('Maintenance', Maintenance, 'odrzavanja')
