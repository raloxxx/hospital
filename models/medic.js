'use strict'
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const medicsSchema = new Schema({
    Uid: {
        type: String
    },
    phone: {
        type: String
    },
    specialism: {
        type: String
    },
    name: {
        type: String
    },
    attentionday: {
        type: Array
    },
    
})

module.exports = mongoose.model('Medics', medicsSchema)