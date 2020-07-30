const express = require("express")

const Calls = require('../models/call')
const Medics = require("../models/medic")

const router = express.Router()


module.exports = async () => {

    router
        
        .post('/update', async (req, res, next) => {
            const body = req.body
            let medic = null

            const cond = {
                Uid1: body.Uid1,
                Uid2: body.Uid2,
                Uid3: body.Uid3
            }
            
            try {
                medic = await Medics.findOne({Uid: cond.Uid1})
            } catch (error) {
                if (error)
                    throw error
            }
            medic.name = body.name1
            medic.specialism = body.specialism1
            medic.phone = body.phone1
            medic.save(err => {
                if (err)
                    throw err
            })

            try {
                medic = await Medics.findOne({Uid: cond.Uid2})
            } catch (error) {
                if (error)
                    throw error
            }
            medic.name = body.name2
            medic.specialism = body.specialism2
            medic.phone = body.phone2
            medic.save(err => {
                if (err)
                    throw err
            })

            try {
                medic = await Medics.findOne({Uid: cond.Uid3})
            } catch (error) {
                if (error)
                    throw error
            }
            medic.name = body.name3
            medic.specialism = body.specialism3
            medic.phone = body.phone3
            medic.save(err => {
                if (err)
                    throw err
            })
            
            
            res.redirect('/')
        })
        
        
        .post('/', (req, res, next) => {
            const body = req.body
            let medic = null

            // Paciente numero 1
            medic = new Medics({
                Uid: body.Uid1,
                phone: body.phone1,
                specialism: body.specialism1,
                name: body.name1
            })

            medic.save(err => {
                if (err)
                    throw err
            })
            // Paciente numero 2
            medic = new Medics({
                Uid: body.Uid2,
                phone: body.phone2,
                specialism: body.specialism2,
                name: body.name2
            })
            medic.save(err => {
                if (err)
                    throw err
            })
            // Paciente numero 3
            medic = new Medics({
                Uid: body.Uid3,
                phone: body.phone3,
                specialism: body.specialism3,
                name: body.name3
            })
            medic.save(err => {
                if (err)
                    throw err
                return res.render('registermedic')
            })
        })

    return router
}

