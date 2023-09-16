const Room = require('../model/RoomModel')

exports.createRoom = async(req,res)=>{
  try{
    const {topic,roomType} = req.body
    if (!topic || !roomType) {
        return res
            .status(400)
            .json({ message: 'All fields are required!' });
    }
    const room = Room.create({
        topic,
        roomType,
        ownerId:req.userId,
        speaker:[req.userId]
        
    })
    return res.status(200).json('rooms Created Successfully')
  }catch(e){console.log(e)}
    
}
exports.getAllRooms = async(req,res)=>{
    try{
      const rooms = await Room.find()
      res.status(200).json(rooms)
    }
    catch(e){console.log(e)}
  }