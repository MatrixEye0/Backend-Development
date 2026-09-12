const express =require('express')
const {createServer} = require('node:http')
const {Server} =   require('socket.io')
const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.static('public'))


app.get('/',(req,res)=>{
    return res.sendFile('index.html')
})


// emit() = Event bhejna
// on = message sunnna 

io.on('connection',(socket)=>{
    console.log('User Connected'  + socket.id)

    socket.on('message',(msg)=>{
      console.log(msg) // server recieve message 
      io.emit('message',msg) // server send mssage to al client
    })  
})

server.listen(500,()=>{
    console.log('server start')
})

// for more info go to socket.io website