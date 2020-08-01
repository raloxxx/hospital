const Medics = require('../../models/medic')
const moment = require('moment')()

module.exports = () => {

    async function render(req, res, next) {
        let response = null

        try {
            response = await Medics.find().lean()

        } catch (error) {
            if (error)
                throw error
        }

        if (!response) {
            return res.status(500).json({
                status: false,
                message: "Internal Server Error"
            })
        } 

        return res.render("registermedic", {
            medic0: response[0],
            medic1: response[1],
            medic2: response[2]
        })


    }
    async function getHour(req, res, next) {
        let date = new Date()
        res.json({
            hora: date.getHours() - 5,
            day: moment.format('dddd').toLowerCase()
        })
    }

    return {
        render,
        getHour
    }
}