const Medics = require("../../models/medic")
const moment = require('moment')()


module.exports = () => {

    async function find(req, res, next) {
        
        let date = new Date()
        console.log(date.getHours(0), moment.format('dddd').toLowerCase())
        let response = null
        try {
            response = await Medics.find({
                // "attentionhour": { 
                //     $in: [date.getHours(0).toString()]
                // },
                // "attentionday": { 
                //     $in: [moment.format('dddd').toLowerCase()] 
                // } 
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

    async function save(req, res, next) {
        const body = req.body
        
        let response = null
        let hour = []
        response = new Medics({
            dni: body.dni,
            phone: body.phone,
            specialism: body.specialism,
            name: body.name,
            attentionday: body.days,
            attentionhour: body.hours
        })
        try {
            response = response.save()
        } catch (error) {
            if (error)
                throw error
        }
        
        if(!response) {
            return res.status(400).json({
                status: false,
                message: 'Hubo un problema al procesar su solicitud, intentlo nuevamente por favor'
            })
        }

        return res.status(200).json({
            status: true,
            data: response,
            message: 'Operacion realizada con exito'
        })
    }

    

    return {
        find,
        save
    }
}