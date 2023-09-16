const router = require('express').Router()
const {verifyToken} = require('../Jwt/jwt')
const {activateUser } = require('../controller/ActivateController')
router.post('/activate',verifyToken,activateUser)
module.exports = router