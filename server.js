const express = require('express');
const cors = require('cors');
const errorHandler = require('errorhandler');
const morgan = require('morgan');
const path = require('path');
const fileUpload = require('express-fileupload');
const client = require('./api/clients.js');
const offer = require('./api/offers.js');
const quote = require('./api/quotes.js');
const fileDwn = require('./downloads.js');
const email = require('./emails');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(fileUpload({
    createParentPath: false
}));
app.use('/clients', client);
app.use('/offers', offer);
app.use('/quotes', quote);
app.use('/', fileDwn);
app.use('/email', email);

app.use(errorHandler());

let PORT = process.env.PORT | 3000;

app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});