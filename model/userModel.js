const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    phone: { type: String, required: false },
    Name: { type: String, required: false },
    img: { type: String, required: false },

    activated: { type: Boolean, required: false, default: false },
})

module.exports = mongoose.model('user',userSchema)