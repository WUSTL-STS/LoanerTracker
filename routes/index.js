const express = require('express');
const router = express.Router();

const Record = require('../models/Record')

router.get('/', async (req, res) => {
    try {
        let records = await Record.find({ 'status': 'true' }).sort({ nextContactDate: 'ascending' }).lean()
        res.render('index', {
            records
        })
    } catch (err) {
        console.log(err)
    }
});

module.exports = router