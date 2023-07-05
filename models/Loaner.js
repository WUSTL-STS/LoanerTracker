const mongoose = require('mongoose')

const LoanerSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    status: {
        // available or loaned (is a string in case we want other statuses)
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Loaner', LoanerSchema)