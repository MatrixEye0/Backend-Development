const express = require('express')
const app = express()
const cookie = require('cookie-parser')
const csrf = require('csurf')
const cookieParser = require('cookie-parser')

//middleware of cookie parser and csrf
app.use(cookieParser())
const csrfProtection = csrf({cookie:true})

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.set('view engine','ejs')

app.get('/',(req,res)=>{
 res.send('welcome')
})

app.get('/',csrfProtection,(req,res)=>{
 res.render('home',{csrfToken: req.csrfToken()})
})
app.post('/form',csrfProtection,(req,res)=>{
    res.send(req.body)
})

app.listen(300,()=>{console.log('Server Start')})