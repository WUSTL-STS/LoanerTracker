import express from 'express'
import mongoose from 'mongoose'
import { create, engine } from 'express-handlebars'
import bodyParser from 'body-parser'
import dayjs from 'dayjs'
import { join } from 'path'
import DBConnect from './config/db'
import bootstrapDefaultLoaners from './scripts/defaultLoanerCreation'
import { Engine } from 'express-handlebars/types'

const app = express() // Create the express server
mongoose.set('debug', false)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

mongoose.set('strictQuery', false)
DBConnect()
const connection = mongoose.connection
connection.once('open', () => {
    console.log('Connected to MongoDB')
})

bootstrapDefaultLoaners()

// Serve CSS from /public
app.use('/js', express.static(join(__dirname, '/node_modules/bootstrap/dist/js'))) // redirect bootstrap JS
app.use('/js', express.static(join(__dirname, '/node_modules/jquery/dist'))) // redirect JS jQuery
app.use('/css', express.static(join(__dirname, '/node_modules/bootstrap/dist/css'))) // redirect CSS bootstrap
app.use('/icons', express.static(join(__dirname, '/node_modules/bootstrap-icons')))
app.use('/static', express.static(join(__dirname, '/static')))

app.engine('hbs', engine({
    extname: '.hbs',
    helpers: {
        dateFormat(date: Date | undefined) {
            if (date !== undefined) {
                return dayjs(date).format('MM/DD')
            }
            return '-'
        },
        checkoutFormat(date: Date | undefined) {
            return dayjs(date || Date.now()).format('YYYY-MM-DD')
        },
        followUpFormat(date: Date | undefined) {
            return date ? dayjs(date).format('YYYY-MM-DD') : '-'
        }
    }
}))
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use('/', require('./routes/index'))
app.use('/loaners', require('./routes/loaners'))
app.use('/records', require('./routes/records'))
app.use('/export', require('./routes/export'))

const port = 8080
app.listen(port, () => {
    console.log(`Server hosted on port ${port} -- http://localhost:${port}`)
    if (process.env.NODE_ENV === 'production') {
        console.log(`Server hosted on port ${port}`)
    }
})
