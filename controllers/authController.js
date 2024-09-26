const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    let errors = [];

    if (!name || !email || !password) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', { errors, name, email, password });
    } else {
        // Check if user exists
        const user = await User.findOne({ email });
        if (user) {
            errors.push({ msg: 'Email already registered' });
            return res.render('register', { errors });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.redirect('/login');
    }
};

exports.renderLoginPage = (req, res) => {
    res.render('login'); // Assuming you have a login.ejs in your views folder
};

exports.renderRegisterUser = (req , res) => {
    res.render('register'); // Assuming you have a register.ejs in your views folder
}

// Handle user registration, logout, and other logic as needed...

exports.loginUser = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/my-blogs',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};

exports.logoutUser = (req, res) => {
    req.logout();
    res.redirect('/');
};
