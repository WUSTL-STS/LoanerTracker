const express = require('express')
const router = express.Router()

const Record = require('../models/Record')
const Loaner = require('../models/Loaner')

router.get('/history', async (req, res) => {
  try {
    const records = await Record.find().sort({ closeDate: 'descending' }).lean()
    res.render('history', { records })
  } catch (err) {
    console.error(err)
  }
})

router.get('/create', async (req, res) => {
  try {
    const loaners = await Loaner.find({ isLoaned: false }).lean({ virtuals: true })
    res.render('create', { available: loaners })
  } catch (err) {
    console.error(err)
  }
})

router.post('/create', async (req, res) => {
  try {
    const check = await Loaner.findOne({ id: req.body.LoanerSelect })
    if (check.isLoaned) {
      throw new Error('Loaner is already loaned out')
    }

    const newRecord = new Record()
    newRecord.name = req.body.ClientName
    newRecord.email = req.body.ClientEmail
    newRecord.loanerID = req.body.LoanerSelect
    newRecord.ticketINC = req.body.TicketID
    newRecord.ticketSysID = parseSysId(req.body.TicketSysID)
    if (req.body.OpenDate) {
      newRecord.openDate = new Date(req.body.OpenDate)
    } else {
      newRecord.openDate = Date.now()
    }

    newRecord.nextContactDate = req.body.NextContact
    await newRecord.save()

    res.redirect('/')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

router.post('/close/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id)
    const loaner = await Loaner.findOne({ id: record.loanerID })
    loaner.isLoaned = false
    record.isOpen = false
    record.closeDate = Date.now()
    await record.save()
    await loaner.save()
    res.redirect('/')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// searches by the ticket number via post request
router.post('/search', async (req, res) => {
  const ticket = req.body.TicketSearch
  if (ticket.replace(/ /g, '') === '') {
    res.redirect('/')
  }

  try {
    const r = await Record.findOne({ ticketINC: ticket })
    if (r) {
      res.redirect('/records/' + r._id)
    } else {
      res.render('error/500')
    }
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id).lean()
    res.render('record', record)
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }
})

router.get('/:id/edit', async (req, res) => {
  try {
    const available = await Loaner.find({ isLoaned: false }).lean({ virtuals: true })
    const record = await Record.findById(req.params.id).lean()
    res.render('create', { record, available })
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }
})

router.post('/:id/edit', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id)
    record.name = req.body.ClientName
    record.email = req.body.ClientEmail
    record.loanerID = req.body.LoanerSelect
    record.ticketINC = req.body.TicketID
    record.phone = req.body.ClientPhone
    record.nextContactDate = req.body.NextContact
    record.ticketSysID = parseSysId(req.body.TicketSysID)
    record.isUnlocked = req.body.LoanerLock
    record.openDate = req.body.OpenDate

    await record.save()
    res.redirect('/')
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }
})

function parseSysId (url) {
  const urlObj = new URL(url)
  const params = new URLSearchParams(urlObj.search)
  return params.get('sys_id')
}

module.exports = router
