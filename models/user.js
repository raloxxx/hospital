'use strict'
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UsersSchema = new Schema({
    fullName: {
        type: String
    },
    dni: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    }
})

module.exports = mongoose.model('Users', UsersSchema)