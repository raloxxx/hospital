const bcrypt = require('bcryptjs');

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

    async function findByDni(req, res, next) {
        const body = req.body
        let response = null

        try {
            response = await Users.findOne({dni: body.dni})
        } catch (error) {
            if (error)
                    throw error
        }

        if (response) {
            return res.status(200).json({
                status: false,
                data: response,
                message: '¡Ya existe un usuario con este dni!'
            })
        }
        
        
        return res.status(200).json({
                status: true,
                data: response,
                message: 'Usuario disponible'
            })
    }


    async function login(req, res, next) {
        const body = req.body
        let response = null

        try {
            response = await Users.findOne({dni: body.dni})
        } catch (error) {
            if (error)
                    throw error
        }


        if(!response) {
            return res.status(200).json({
                status: false,
                message: 'Usuario incorrecto, Verifique sus datos e intentelo nuevamente'
            })
        }

        if(!bcrypt.compareSync(body.password, response.password)) {
            return res.status(200).json({
                status: false,
                message: 'Usuario incorrecto, Verifique sus datos e intentelo nuevamente'
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


        try {
            response = await Users.findOne({dni: body.dni})
        } catch (error) {
            if (error)
                    throw error
        }

        if(response) {
            return res.status(200).json({
                status: false,
                message: '¡Ya existe un usuario con este dni!'
            })
        }


        response = new Users({
            fullName: body.fullName,
            dni: body.dni,
            phone: body.phone,
            password: bcrypt.hashSync(body.password, 10),
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
        login,
        save,
        findByDni
    }
}