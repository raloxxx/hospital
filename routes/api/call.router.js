const express = require("express")

const { apiCallController } = require('../../controllers')

const router = express.Router()

router
    .post('/', apiCallController().save)


module.exports = router