const express = require("express")

const { apiMedicController } = require('../../controllers')

const router = express.Router()

router
    .get('/', apiMedicController().find)
    .get('/date', apiMedicController().findByDate)
    .post('/', apiMedicController().save)


module.exports = router