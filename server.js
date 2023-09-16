const express = require('express')
require('dotenv').config({path:'./.env'})
const app = express()
const Port = process.env.PORT
const path = require('path')
const server = require('http').createServer(app)
const cors = require('cors')
const otpRoutes = require('./routes/otpRoutes')
const activate = require('./routes/activateRoutes')
const connectDb = require('./Db/Db')
const room = require('./routes/RoomRoutes')
//middlewaruse
const io = require('socket.io')(server,{
    origin: 'http://localhost:5173',
    methods: 'GET,POST',
  
})
app.use(express.json({limit:'8mb'}))
const corsOption = {
    credentials: true,
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOption));
app.use('/api/',otpRoutes)
app.use('/api/',activate)
app.use('/api/',room)


app.use('/storage', express.static('storage'));
//connectDb
connectDb()
//socket
io.on('connection',(socket)=>{
    console.log('new connection',socket.id)
})
server.listen(Port,()=>(console.log(`server is running at port ${Port}`)))
//run server
