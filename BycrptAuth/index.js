const express = require('express')
const app = express()
const bcrypt = require('bcryptjs')
const session = require('express-session')
const mongo = require('mongoose')
const User = require('./model/user.model')

mongo.connect('mongodb://127.0.0.1:27017/password')
.then(()=>console.log('Connect DB'))

// bcrypt store password with encript way because of is method .hash()


app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.set('view engine','ejs')

app.use(session({
    secret: '123',
    resave:false,
    saveUninitialized:false,
    // no cookie we crete when login and end when logout code in below
}))

// for multiple page we use middleware for check user session detail
let checkLogin = (req,res,next)=>{
    if(req.session.user){
       next() // send to page i want
    }
    else{
        res.redirect('login')
    }
}

app.get('/',checkLogin,(req,res)=>{ // now user not direct access this page only by login because of checkLogin
    res.render('home')
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})
app.get('/login',(req,res)=>{
    if(req.session.user){
       res.redirect('/')
    }else{
        res.redirect('login')
    }
    res.render('login')
})
app.post('/signup',async(req,res)=>{
    const {username, password}= req.body
    const hashPassword = await bcrypt.hash(password, 10) // hash work as asynchronous
    // res.send({username, password:hashPassword})
    await User.create({username, password:hashPassword})
    res.redirect('login')
})

//post for login
app.post('/login', async(req,res)=>{
    const {username, password}= req.body

    const user= await User.findOne({username})
    if(!user) return res.render('login', {err:'User not found'})

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.render('login', {err:'password not match'})
 
    req.session.user =username
    res.redirect('/')    
})
app.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
})

app.listen(200,()=>{console.log('Server Start')})