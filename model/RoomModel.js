const mongoose =require('mongoose')
const Schema = mongoose.Schema
const RoomSchema = new Schema({
    topic:{type:String},
    roomType:{type:String},
    ownerId:{type:Schema.Types.ObjectId,ref:'user'},
    speaker:{type:[
        {
            type:Schema.Types.ObjectId,ref:'user'
        }
    ]},
})

module.exports = mongoose.model('room',RoomSchema)