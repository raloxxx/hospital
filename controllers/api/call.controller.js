const twilio = require('twilio');

const Calls = require("../../models/call")


const accountSid = 'AC3d80e41.......'; // Tu Account SID obtenido de www.twilio.com/console
const authToken = 'tu_auth_token'; // Tu Auth Token

const client = new twilio(accountSid, authToken);


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

        client.messages.create({
            body: 'Llamada recibida desde la aplicacion',
            to: `+51953727681`,  // Número al que se enviará el SMS a 10 digitos incluyendo el signo +
            from: '+14302058656' // Número comprado de Twilio.com a 10 digitos incluyendo el signo +
        })
        .then((message) => console.log(message.sid));
        
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