const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contractSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    isCompany: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    status: {
        type: String
    },
    done: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        required: true
    },
    contractSum: {
        type: Number,
        default: 0
    },
    debt: {
        type: Number,
        default: 0
    },
    contractDescription: {
        type: String
    },
    payments: [{
        sum: { type: Number },
        date: { type: Date },
        paymentType: { type: String }
    }], 
    comments: {
        type: String
    }
})

module.exports = mongoose.model('contract', contractSchema)