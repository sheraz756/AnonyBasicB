const User = require('../model/userModel')
const Jimp = require('jimp');
const path = require('path');
const jwt = require('../Jwt/jwt')
exports.activateUser = async(req,res)=>{
    const {img,Name} = req.body
    if (!Name || !img) {
        res.status(400).json({ message: 'All fields are required!' });
    }

    // Image Base64
    const buffer = Buffer.from(
        img.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
        'base64'
    );
    const imagePath = `${Date.now()}-${Math.round(
        Math.random() * 1e9
    )}.png`;
    // 32478362874-3242342342343432.png

    try {
        const jimResp = await Jimp.read(buffer);
        jimResp
            .resize(150, Jimp.AUTO)
            .write(path.resolve(__dirname, `../storage/${imagePath}`));
    } catch (err) {
        res.status(500).json({ message: 'Could not process the image' });
    }
    
    const userId = req.userId;
    try {
        const user = await User.findById({ _id: userId });
        if (!user) {
            res.status(404).json({ message: 'User not found!' });
        }
        user.activated = true;
        user.Name = Name;
        user.img = `http://localhost:5000/storage/${imagePath}`;
        user.save();
        const token = jwt.sign(JSON.stringify(user))
        res.json({token, auth: true });
    } catch (err) {
        res.status(500).json(err.message);
    }

}