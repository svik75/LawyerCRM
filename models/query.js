const mongoose = require('mongoose')
const Schema = mongoose.Schema

const querySchema = new Schema({
    name: {
        type: String,
        required: false
    },
    query: {
        type: String,
        default: ''
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
    history: [{
        event: { type: String },
        date: { type: Date },
        comments: { type: String },
        user: { type: String }
    }],
    queryPath: { type: String}
})

module.exports = mongoose.model('query', querySchema)