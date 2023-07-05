const express = require('express');
const router = express.Router();

const Record = require('../models/Record')
const Loaner = require('../models/Loaner')

router.get('/history', async (req,res) => {
    try {
        const r = await Record.find().sort({ closeDate: 'descending'}).lean()
        res.render('allRecords', {r})
    } catch (err) {
        console.error(err)
    }
})

router.get('/create', (req, res) => {
    res.render('create')
})

router.get('/loaner-available/:id', async (req, res) => {
    try {
        const loanerNumber = req.params.id
        console.log(loanerNumber)
        const l = await Loaner.findOne({ id: loanerNumber })
        res.json(l)
    } catch (err) {
        console.error(err)
    }
})

router.post('/create', async (req, res) => {
    try {
        console.log(req.body)
        const newRecord = new Record()
        newRecord.name = req.body.ClientName
        newRecord.email = req.body.ClientEmail
        // newRecord.studentID = req.body.ClientID
        newRecord.loanerID = req.body.LoanerNum
        newRecord.ticketID = req.body.TicketID
        newRecord.phone = req.body.ClientPhone
        newRecord.ticketSysID = req.body.TicketSysID
        newRecord.nextContactDate = req.body.NextContact
        if(req.body.OpenDate){
            newRecord.openDate = new Date(req.body.OpenDate)
        } else {
            newRecord.openDate = Date.now();
        }

        await newRecord.save()
        // update loaner status
        const loanerNum = req.body.LoanerNum
        await Loaner.findOneAndUpdate({ id: loanerNum }, { status: 'loaned' })

        res.redirect('/')
    } catch (err) {
        console.error(err);
    }
})

router.post('/close/:id', async(req, res) => {
    try {
        let r = await Record.findById(req.params.id)
        r.status = false;
        r.closeDate = Date.now()
        await r.save();
        res.redirect('/')
    } catch (err) {
        console.log(err)
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
            const r = await Record.findOne({ ticketID : ticket })
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
            r.ticketID = req.body.TicketID
            r.phone = req.body.ClientPhone
            r.nextContactDate = req.body.NextContact
            r.ticketSysID = req.body.TicketSysID
            r.loanerUnlocked = req.body.LoanerLock
            r.openDate = req.body.OpenDate

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