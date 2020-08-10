'use strict'
const mongoose = require('mongoose')

const moment = require('moment-timezone');

const Schema = mongoose.Schema

const datePeru = moment().tz("America/Lima").format();

const callsSchema = new Schema({
    phone: {
        type: String
    },
    clientName: {
        type: String
    },
    medicName: {
        type: String
    },
    created_at: {
        type: Date,
        default: datePeru
    }
})

module.exports = mongoose.model('Calls', callsSchema)