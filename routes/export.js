const express = require('express');
const router = express.Router();

const Record = require('../models/Record')

const { parse } = require('json2csv');
const fields = ['name', 'email', 'phone', 'studentID', 'ticketID', 'loanerID', 'openDate', 'closeDate'];
const opts = { fields };

router.post('/', async (req, res) => {
    try {
        let start = 0
        let end = 0
        if(req.body.StartDate === '' && req.body.EndDate === ''){
            start = new Date("11/1/2021")
            end = Date.now()
        } else {
            if(req.body.StartDate === ''){
                res.redirect('/history')
            } else {
                start = new Date(req.body.StartDate)
            }

            if(req.body.EndDate === ''){
                end = Date.now()
            } else {
                end = new Date(req.body.EndDate)
            }
        }
        const r = await Record.find({
            openDate: {
                $gte: start,
                $lte: end
            }
            }).lean()
        const csv = parse(r, opts);
        res.header('Content-Type', 'text/csv');
        res.attachment("records.csv");
        return res.send(csv);
    } catch (err) {
        console.log(err)
    }
})

module.exports = router