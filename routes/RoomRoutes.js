const {createRoom,getAllRooms} = require('../controller/RoomController')
const jwt = require('../Jwt/jwt')
const router = require('express').Router()
router.post('/createRoom',jwt.verifyToken,createRoom)
router.post('/getAllRooms',jwt.verifyToken,getAllRooms)

module.exports = router