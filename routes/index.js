const MedicRouter = require('./api/medic.router')
const CallRouter = require('./api/call.router')
const UserRouter = require('./api/user.router')

const MedicPublicRouter = require('./public/medic.router')

module.exports = (app) => {
    app.use('/', MedicPublicRouter)

    app.use('/api/medic', MedicRouter)
    app.use('/api/call', CallRouter)
    app.use('/api/user', UserRouter)

}