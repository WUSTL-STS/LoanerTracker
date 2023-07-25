const mongoose = require('mongoose')

const RecordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  loanerID: {
    type: Number,
    required: true
  },

  ticketINC: {
    type: String,
    required: true
  },

  ticketSysID: {
    type: String,
    required: true
  },

  isOpen: {
    type: Boolean,
    default: true
  },

  isUnlocked: {
    type: Boolean,
    default: true
  },

  openDate: {
    type: Date,
    required: true
  },

  closeDate: {
    type: Date,
    default: null
  },

  nextContactDate: {
    type: Date,
    required: false,
    default: null
  }
})

module.exports = mongoose.model('Record', RecordSchema)
