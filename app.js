const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

require('dotenv').config();
require('./config/passport')(passport);
const connectDB = require('./config/database');

// Connect to DB
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// EJS
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/blogRoutes'));

// Static folder
app.use(express.static('public'));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
