const router = require('express').Router()

const {sendOtp,verifyOtp} = require('../controller/otpController')

router.post('/sendOtp',sendOtp)
router.post('/verifyOtp',verifyOtp)


module.exports = router
