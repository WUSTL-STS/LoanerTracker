const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const moment = require('moment')

const app = express(); //Create the express server
mongoose.set('debug', false);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false,
}))

// parse application/json
app.use(bodyParser.json())

mongoose.set("strictQuery", false)
const DBConnect = require('./config/db');
DBConnect();
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected to MongoDB");
});

const bootstrapDefaultLoaners = require('./scripts/defaultLoanerCreation')
bootstrapDefaultLoaners();

//Serve CSS from /public
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/icons', express.static(__dirname + '/node_modules/bootstrap-icons'));
app.use('/static', express.static(__dirname + '/static'))

//Enable handlebars
const hbs = exphbs.create({
    extname: '.hbs',
    helpers: {
        dateFormat(date) {
            if (date) {
                return moment(date).format("MM/DD");
            }
            return "-"
        },
        checkoutFormat(date) {
            return moment(date ? date : Date.now()).format("YYYY-MM-DD")
        },
        followUpFormat(date) {
            return date ? moment(date).format("YYYY-MM-DD") : '-'
        }
    }
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set("views", './views');

app.use('/', require('./routes/index'))
app.use('/loaners', require('./routes/loaners'))
app.use('/records', require('./routes/records'))
app.use('/export', require('./routes/export'))

const port = 8080;
app.listen(port, () => {
    console.log(`Server hosted on port ${port} -- http://localhost:${port}`);
    if (process.env.NODE_ENV === 'production') {
        console.log(`Server hosted on port ${port}`);
    }
});
