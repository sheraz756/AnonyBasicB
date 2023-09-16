const crypto = require('crypto')
const User = require('../model/userModel')
const jwt = require('../Jwt/jwt')

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid, smsAuthToken, {
    lazyLoading: true,
});
exports.sendOtp=async(req,res)=>{
    const {phone} = req.body
    // const otp = crypto.randomInt(1000,9999)
    const otp = 7777
    const ttl = 1000 * 60 * 2; // 2 min
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hash = crypto.createHmac('sha256','sdffsfsd').update(data).digest('hex')
    // twilio.messages.create({
    //     to: phone,
    //     from: process.env.SMS_FROM_NUMBER,
    //     body: `Your Anony OTP is ${otp}`,
    // });
    
    try {
        // await otpService.sendBySms(phone, otp);
        res.json({
            hash: `${hash}.${expires}`,
            phone:phone,
            otp
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'message sending failed' });
    }
}
exports.verifyOtp = async (req, res) => {
    const { phone, otp, hash } = req.body;

    if (!otp || !hash || !phone) {
        return res.status(409).json({ message: 'All fields are required!' });
    }

    const [hashedOtp, expires] = hash.split('.');

    if (Date.now() > +expires) {
        return res.status(400).json({ message: 'OTP expired!' });
    }

    const data = `${phone}.${otp}.${expires}`;
    const compare = crypto.createHmac('sha256','sdffsfsd').update(data).digest('hex')

    if (hashedOtp !== compare) { 
        return res.status(401).json({ message: 'Invalid OTP' });
    }

    let user;
    try {
        user = await User.findOne({ phone });
        if (!user) {
            user = await User.create({ phone });
            user.save();
        } 
            // const { _id } = user;
            const token = jwt.sign({ user });
            return res.status(201).json({ token,user });
        
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
