'use strict'
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const medicsSchema = new Schema({
    dni: {
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
    attentionhour: {
        type: Array
    },
    
})

module.exports = mongoose.model('Medics', medicsSchema)