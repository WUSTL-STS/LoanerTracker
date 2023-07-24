const express = require('express');
const router = express.Router();

// const Record = require('../models/Record')
const Loaner = require('../models/Loaner')


router.get('/', async (req,res) => {
    try {
        const r = await Loaner.find().lean()
        res.json(r)
    } catch (err) {
        console.error(err)
    }
})

module.exports = router