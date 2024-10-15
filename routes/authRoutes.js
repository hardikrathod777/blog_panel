const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.renderLoginPage);
router.get('/register', authController.renderRegisterUser);

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);

// Step 1: Forgot Password page
router.get('/ForgotPassword', authController.ForgotPassword);

// Step 2: Send OTP
router.post('/sendOtp', authController.sendOtp);

router.get('/Otp_Conf/:userId', authController.Otp_Conf);

// Step 4: Verify OTP (with userId as a URL param)
router.post('/verifyOtp/:userId', authController.verifyOtp);

// Step 5: Change Password page (with userId as a URL param)
router.get('/Change_pass/:userId', authController.Change_pass);

// Step 6: Handle Password Change (with userId as a URL param)
router.post('/changePassword/:userId', authController.changePassword);

module.exports = router;
