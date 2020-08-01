const express = require("express")

const { publicMedicController } = require('../../controllers')

const router = express.Router()

router
    .get('/', publicMedicController().render)
    .get('/hour', publicMedicController().getHour)


module.exports = router