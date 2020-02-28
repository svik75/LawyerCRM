const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActivated: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('user', uSchema)