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

// initialize the first n laptops
// check to first make sure there are n laptops
const Loaner = require('./models/Loaner')
const n = 50

// Loaner.deleteMany({})
//   .then((res) => {
//     console.log(`Deleted ${res.deletedCount} laptops.`);
//   })
//   .catch((err) => {
//     console.error(`Error: ${err}`);
//   });

const r = Loaner.find().then(loaners => {
    if (loaners.length <= n) {
        const loanersToAdd = n - loaners.length;
        for (let i = loaners.length + 1; i < loanersToAdd + loaners.length + 1; i++) {
            const newLoaner = new Loaner({
              id: i,
              status: 'available'
            });
            newLoaner.save(err => {
                if (err) {
                  console.log(`Error: ${err}`);
                } else {
                  console.log(`Laptop with id ${i} has been added.`);
                }
            })

        }
    }

    // print out current loaners
    Loaner.find()
    .then((loaners) => {
      const availableLoaners = loaners.filter(loaner => loaner.status === 'available');
      const unavailableLoaners = loaners.filter(loaner => loaner.status !== 'available');
  
      console.log('Available loaners:');
      console.log(availableLoaners.length);
      
      console.log('Unavailable loaners:');
      console.log(unavailableLoaners.length);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
})


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
        prefillFormat(date) {
            if(date) {
                return moment(date).format("YYYY-MM-DD")
            }
        }
    }
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set("views", './views');

app.use('/', require('./routes/index'))
app.use('/records', require('./routes/records'))
app.use('/file', require('./routes/file'))
app.use('/export', require('./routes/export'))

//Open port 8080
const port = 8080;
app.listen(port, () => {
    console.log(`Server hosted on port ${port} -- http://localhost:${port}`);
    if (process.env.NODE_ENV === 'production') {
        console.log(`Server hosted on port ${port}`);
    }
});
