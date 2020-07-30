const Medics = require("../../models/medic")

module.exports = () => {

    async function find(req, res, next) {
        let response = null
        try {
            response = await Medics.find().lean()
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
        find
    }
}