const mongoose = require('mongoose')

const RecordSchema = new mongoose.Schema({

    //Client contact info
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true
    },

    studentID: {
        type: Number,
        required: true
    },

    loanerID: {
        type: Number,
        required: true
    },

    //Ticket and record metrics
    ticketID: {
        type: String,
        required: true
    },

    ticketSysID: {
        type: String,
        required: true
    },

    status: {
        type: Boolean,
        default: true,
        required: true
    },

    loanerUnlocked: {
        type: Boolean,
        default: true,
    },

    openDate: {
        type: Date,
        required: true
    },

    closeDate: {
        type: Date,
        required: false,
        default: null
    },

    nextContactDate: {
        type: Date,
        required: false,
        default: null
    },

    loanerForms: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GridFile',
    },

    proofRepair: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GridFile',
    }
})

module.exports = mongoose.model('Record', RecordSchema)