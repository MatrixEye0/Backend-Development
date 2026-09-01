const ex= require('express');
const http = require('http');


const app = ex();
app.get('/',(req,res)=>{
    res.send('Welcome to Home Page Jagjit')
})
app.get('/about',(req,res)=>{
    res.send('Welcome to About Page Jagjit')
})

// const server = http.createServer(app)
// server.listen(4000,()=>console.log('Server Listen and Start !!!')) 
// in express we do this same in one line
app.listen(4000,()=>console.log('Server Listen and Start !!!'))