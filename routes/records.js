const express = require('express');
const router = express.Router();

const Record = require('../models/Record')
const Loaner = require('../models/Loaner')

router.get('/history', async (req,res) => {
    try {
        const records = await Record.find().sort({ closeDate: 'descending'}).lean()
        res.render('allRecords', {records})
    } catch (err) {
        console.error(err)
    }
})

router.get('/create', async (req, res) => {
    try {
        const records = await Loaner.find({ isLoaned: true }).lean()
        res.render('create', {available: records})
    } catch (err) {
        console.error(err)
    }
})

router.get('/loaner-available/:id', async (req, res) => {
    try {
        const loanerNumber = req.params.id
        const l = await Loaner.findOne({ id: loanerNumber })
        res.json(l)
    } catch (err) {
        console.error(err)
    }
})

router.post('/create', async (req, res) => {
    try {
        // Check to see if the loaner is available
        const check = await Loaner.findOne({ id: req.body.LoanerSelect })
        if (check.isLoaned) {
            throw "Loaner is already loaned out"
        }

        const newRecord = new Record()
        newRecord.name = req.body.ClientName
        newRecord.email = req.body.ClientEmail
        newRecord.loanerID = req.body.LoanerSelect
        newRecord.ticketINC = req.body.TicketID
        newRecord.ticketSysID = ((url) => {
            const urlObj = new URL(url);
            const params = new URLSearchParams(urlObj.search);
            return params.get("sys_id");
        })(req.body.TicketSysID)
        if(req.body.OpenDate){
            newRecord.openDate = new Date(req.body.OpenDate)
        } else {
            newRecord.openDate = Date.now();
        }
        
        newRecord.nextContactDate = req.body.NextContact
        await newRecord.save()

        res.redirect('/')
    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
})

router.post('/close/:id', async(req, res) => {
    try {
        let r = await Record.findById(req.params.id)
        let l = await Loaner.findOne({ id: r.loanerID })
        l.status = 'available'
        r.status = false;
        r.closeDate = Date.now()
        await r.save();
        await l.save();
        res.redirect('/')
    } catch (err) {
        console.error(err)
    }
})

//searches by the ticket number via post request
router.post('/search', async (req, res) => {
    try {
        const ticket = req.body.TicketSearch
        if(ticket.replace(/ /g, '') === ''){
            console.log("found empty")
            res.redirect('/')
        }else{  
            const r = await Record.findOne({ ticketINC : ticket })
            if(r) {
                res.redirect('/records/' + r._id)
            } else {
                res.render('error/500')
            }
        }
    } catch (err) {
        res.render('error/500')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const r = await Record.findById(req.params.id).lean()
        res.render('record', r)
    } catch (err) {
        console.log(err)
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        const r = await Record.findById(req.params.id).lean()
        res.render('create', {r})
    } catch (err) {
        console.log(err)
    }
})

router.post('/:id/edit', async (req, res) => {
    try {
        let r = await Record.findById(req.params.id)
        if(r){
            r.name = req.body.ClientName
            r.email = req.body.ClientEmail
            r.studentID = req.body.ClientID
            r.loanerID = req.body.LoanerNum
            r.ticketINC = req.body.TicketID
            r.phone = req.body.ClientPhone
            r.nextContactDate = req.body.NextContact
            r.ticketSysID = req.body.TicketSysID
            r.loanerUnlocked = req.body.LoanerLock
            r.openDate = req.body.OpenDate

            if (req.body.loanerForm) {
                r.loanerForm = "checked"
            } else {
                r.loanerForm = ""
            }

            if (req.body.proofOfRepair) {
                r.proofOfRepair = "checked"
            } else {
                r.proofOfRepair = ""
            }

            await r.save()
            res.redirect('/')
        } else {
            res.render('error/500')
        }
    } catch (err) {
        console.log(err)
    }
})
module.exports = router