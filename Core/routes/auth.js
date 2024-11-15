const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth');

router.post('/signup', authCtrl.signup);
router.post('/verifyOtp', authCtrl.verifyOtp);
router.post('/resendOtp', authCtrl.resendOTP);
router.post('/refreshToken', authCtrl.refreshToken);
router.post('/login', authCtrl.login);

module.exports = router;