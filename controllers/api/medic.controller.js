const Medics = require("../../models/medic")
const moment = require('moment')()


module.exports = () => {

    async function find(req, res, next) {
        const query = req.query
        
        let date = new Date()
        console.log(date.getHours(0), moment.format('dddd').toLowerCase())
        let response = null
        try {
            response = await Medics.find({
                "attentionhour": { 
                    $in: [date.getHours(0).toString()]
                },
                "attentionday": { 
                    $in: [moment.format('dddd').toLowerCase()] 
                } 
            }).lean()
        } catch (error) {
            if (error)
                    throw error
        }

        if(!response) {
            return res.status(500).json({
                status: false,
                message: "Internal Server Error"
            })
        }
        
        return res.status(200).json({
                status: true,
                data: response,
                message: 'Operacion exitosa'
            })

    }

    async function findByDate(req, res, next) {
        let response = null
        try {
            response = await Medics.find({
                "attentionday": { 
                    $in: [moment.format('dddd').toLowerCase()] 
                } 
            }).lean()
        } catch (error) {
            if (error)
                    throw error
        }

        if(!response) {
            return res.status(500).json({
                status: false,
                message: "Internal Server Error"
            })
        }
        
        return res.status(200).json({
                status: true,
                data: response,
                message: 'Operacion exitosa'
            })

    }

    

    return {
        find,
        findByDate
    }
}