const express = require('express');
const router = express.Router();
const { Parser } = require('@json2csv/plainjs');
const Record = require('../models/Record')

router.post('/', async (req, res) => {
    try {
        const fields = ['name', 'email', 'phone', 'studentID', 'ticketID', 
                            'loanerID', 'openDate', 'closeDate']
        const opts = { fields }
        const parser = new Parser(opts)
        if(req.body.startDate === '' && req.body.endDate === '') {
            const r = await Record.find().sort({ closeDate: 'descending'}).lean()
            const csv = parser.parse(r)
            res.header('Content-Type', 'text/csv')
            res.attachment("records.csv")
            return res.send(csv)
        }

        const r = await Record.find(
            {
                openDate: {
                    $gte: req.body.startDate,
                    $lte: req.body.endDate
                }
            }
        ).sort({ closeDate: 'descending'}).lean()
        const csv = parser.parse(r)
        res.header('Content-Type', 'text/csv')
        res.attachment("records.csv")
        return res.send(csv)
    }
    catch (err) {
        console.error(err)
    }
})

module.exports = router