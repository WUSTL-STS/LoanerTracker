const mongoose = require('mongoose')

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

module.exports = mongoose.model('Loaner', LoanerSchema)