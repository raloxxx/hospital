const twilio = require('twilio');

const Calls = require("../../models/call")


const accountSid = 'AC36c3d9b8239ffab82f83def470f869c6'; // Tu Account SID obtenido de www.twilio.com/console
const authToken = '531aafb4d988e259c01e98d0f703a4fc'; // Tu Auth Token

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
        console.log('numero de telefono', body.medicPhone )

        client.messages.create({
            body: `Lamada recibida desde la aplicacion por ${body.phone}`,
            to: `+51${body.medicPhone}`,  // Número al que se enviará el SMS a 10 digitos incluyendo el signo +
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