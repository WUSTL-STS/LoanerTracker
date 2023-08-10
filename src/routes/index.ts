import express from 'express'
const router = express.Router()

import Record from '../models/Record'

router.get('/', async (_, res) => {
    try {
        const records = await Record.find({ isOpen: 'true' }).sort({ nextContactDate: 'ascending' }).lean()
        res.render('index', {
            records
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
