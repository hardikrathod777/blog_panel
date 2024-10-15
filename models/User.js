const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetOtp: {
        type: String,  // OTP will be stored as a string
        required: false
    },
    otpExpires: {
        type: Date,    // Expiration time for the OTP
        required: false
    },
    resetPasswordToken: String, // To store reset token
    resetPasswordExpires: Date,
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
