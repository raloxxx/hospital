const Calls = require("../../models/call")

module.exports = () => {

    async function save(req, res, next) {

        const body = req.body
        let response = null

        response = new Calls({
            phone: body.phone,
            clientName: body.clientName,
            medicName: body.medicName
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
        save
    }
}