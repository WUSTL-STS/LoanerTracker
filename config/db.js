const mongoose = require('mongoose')

const DBConnect = async () => {
    try {
        let uri;
        const conn = await mongoose.connect("mongodb://db:27017/loanertracker")

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = DBConnect
