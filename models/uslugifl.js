const mongoose = require('mongoose')
const Schema = mongoose.Schema

const uslugiFLSchema = new Schema({
    uid: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    parent: {
        type: Number,
        required: true
    },
    child: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    idDescr: {
        type: Number,
        required: false
    },
  
})

module.exports = mongoose.model('uslugifl', uslugiFLSchema)