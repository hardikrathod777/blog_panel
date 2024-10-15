const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { promisify } = require('util');
const randomBytesAsync = promisify(crypto.randomBytes);

const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or your email service
    auth: {
        user: 'harahrathod1432@gmail.com',
        pass: 'nsymdceluqwacark',
    },
});

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


exports.loginUser = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/my-blogs',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};

exports.logoutUser = (req, res) => {
    req.logout(err => {
        if (err) {
            return next(err); // Handle error during logout
        }
        res.redirect('/login'); // Redirect to the login page after logout
    });
};


exports.ForgotPassword = (req ,res) => {
    res.render('ForgotPassword');
}
exports.sendOtp = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
        return res.render('ForgotPassword', { errors: [{ msg: 'User not found' }] });
    }
     // Generate Reset Token
     const token = (await randomBytesAsync(20)).toString('hex');

     // Set token and expiration (e.g., 1 hour)
     user.resetPasswordToken = token;
     user.resetPasswordExpires = Date.now() + 3600000;
    // Generate OTP (4-6 digits)
    const otp = crypto.randomInt(100000, 999999).toString();

    // Save OTP and expiration (5 minutes)
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes expiration
    await user.save();

    const resetLink = `http://${req.headers.host}/Change_pass/${token}`;
    // Send OTP to user's email
    const mailOptions = {
        from: 'harahrathod1432@gmail.com',
        to: user.email,
        subject: 'Your OTP for Password Reset',
        text: `Your OTP is ${otp}`+
                `You are receiving this email because you (or someone else) requested a password reset for your account.\n\n` +
                `Please click the following link, or paste it into your browser to complete the process:\n\n` +
                `${resetLink}\n\n`,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        else{
        console.log('OTP sent: ' + info.response);
        }
    });

    console.log(`Generated OTP for ${user.email}: ${otp}`);

    res.redirect(`/Otp_Conf/${user._id}`);
};

exports.Otp_Conf = (req, res) => {
    res.render('Otp', { userId: req.params.userId }); 
};

exports.verifyOtp = async (req, res) => {
    const { otp } = req.body;
    const { userId } = req.params;
    console.log(userId);
    
    const user = await User.findById(userId);

    if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
        return res.render('Otp', { errors: [{ msg: 'Invalid or expired OTP' }], userId });
    }

    res.redirect(`/Change_pass/${userId}`);
};

exports.Change_pass = (req, res) => {
    res.render('ForgotPass', { userId: req.params.userId }); // Render change password page
};

exports.changePassword = async (req, res) => {
    const { New_pass } = req.body;
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(400).send('User not found');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(New_pass, 10);

    // Update the user's password
    user.password = hashedPassword;
    user.resetOtp = undefined; // Clear the OTP
    user.otpExpires = undefined; // Clear OTP expiration
    await user.save();

    res.redirect('/login');
};
