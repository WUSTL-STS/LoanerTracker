const mongoose = require('mongoose')

const DBConnect = async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            const conn = await mongoose.connect("mongodb://db:27017/loanertracker")
            console.log(`MongoDB Connected: ${conn.connection.host}`)
        } else {
            const conn = await mongoose.connect("mongodb://localhost:27017/loanertracker")
            console.log(`MongoDB Connected: ${conn.connection.host}`)
        }
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = DBConnect
