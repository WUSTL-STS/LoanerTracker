const mongoose = require('mongoose')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')

const LoanerSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },

  isLoaned: {
    type: Boolean,
    default: false,
    required: true
  },

  OS: {
    type: String,
    enum: ['WINDOWS', 'MACOS'],
    required: true
  }
})

LoanerSchema.virtual('name').get(function () {
  return `${this.id} - ${this.OS}`
})

LoanerSchema.plugin(mongooseLeanVirtuals)

module.exports = mongoose.model('Loaner', LoanerSchema)
