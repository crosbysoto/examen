const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const dotenv = require('dotenv');

// settings
app.set('port', 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
dotenv.config();

const PORT = process.env.PORT || 4000;


// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'examen',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

// routes
app.use(require('./routes/index'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// listening the server
app.listen(PORT, () => {
    console.log('Server on port ', PORT);
});