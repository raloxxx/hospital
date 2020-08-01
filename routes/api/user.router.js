const express = require("express")

const { apiUserController } = require('../../controllers')

const router = express.Router()

router
    .get('/', apiUserController().find)
    .get('/:dni', apiUserController().findOne)
    .post('/', apiUserController().save)
    .post('/login', apiUserController().login)
    .post('/dni', apiUserController().findByDni)


module.exports = router