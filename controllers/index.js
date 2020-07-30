'use strict'

const apiMedicController = require('./api/medic.controller')
const apiCallController = require('./api/call.controller')
const apiUserController = require('./api/user.controller')

const publicMedicController = require('./public/medic.controller')

module.exports = {
    apiMedicController,
    apiCallController,
    apiUserController,

    publicMedicController
}