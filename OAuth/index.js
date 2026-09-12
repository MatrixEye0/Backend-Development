const express = require('express')
const session = require('express-session')
const passport = require('passport')
require('./auth/google')
const app = express()

const port = 9000

app.use(session({
    secret:'js123',
    resave: false,
    saveUninitialized:false,

}))
// passport start by middleware
app.use(passport.initialize())
app.use(passport.session())

app.get('/',(req,res)=>{
 res.send('<a href="/auth/google"> Login With Google </a>')
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] })
);
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login' ,
    successRedirect: '/profile'
}),
);

app.get('/profile',(req,res)=>{
   if(!req.isAuthenticated()) return res.redirect('/')
    res.send(`<h1> Welcome  ${req.user.displayName} </h1>
      <img src="${req.user.photos?.[0]?.value}"/>
      <a href='/logout'> Logout </a>
 `)
 console.log(req.user)
});

app.get('/logout',(req,res)=>{
    req.logout(()=>{
        res.redirect('/')
    })
})

app.listen(port,()=>{
    console.log('Server Start')
})