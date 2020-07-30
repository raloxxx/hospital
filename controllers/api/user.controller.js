const Users = require('../../models/user')

module.exports = () => {
    async function find(req, res, next) {
        let response = null
        try {
            response = await Users.find().lean()
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
    async function findOne(req, res, next) {
        
        const params = req.params
        let response = null

        try {
            response = await Users.findOne({dni: params.dni})
        } catch (error) {
            if (error)
                    throw error
        }


        if(!response) {
            return res.status(400).json({
                status: false,
                message: "Recurso no encontrado"
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

        response = new Users({
            fullName: body.fullName,
            dni: body.dni,
            phone: body.phone,
            password: body.password
        })


        try {
            response = await response.save()
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
        findOne,
        save
    }
}