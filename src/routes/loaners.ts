import express from 'express'
import Loaner from '../models/Loaner'
const router = express.Router()

router.get('/', async (_, res) => {
  try {
    const r = await Loaner.find().lean()
    res.json(r)
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
