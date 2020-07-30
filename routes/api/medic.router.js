const express = require("express")

const { apiMedicController } = require('../../controllers')

const router = express.Router()

router
    .get('/', apiMedicController().find)


module.exports = router