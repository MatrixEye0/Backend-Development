const ex = require('express')
const app = ex()
const session = require('express-session')
const MongoStore = require('connect-mongo').default
//const mongo = require('mongoose')

// session duration tak session data webpage me har jagha use kar sako  generally session store in RAM but some time ram get full so we use DB to store session
// with help of npm i connect-mongo we store session in mongoDB and use by just add one key in middleware key is store.
//middleware
app.use(session({
    secret:'secret', // session secrete key
    resave: false,
    store: MongoStore.create({mongoUrl:'mongodb://127.0.0.1:27017/session'}),// store session in mongo
    saveUninitialized: false,
    cookie: {maxAge: 1000*60} // session duration
}))

app.get('/',(req,res)=>{
    res.send('<h1> Welcome </h1>')
})

app.get('/setSession',(req,res)=>{
    req.session.username="Jagjit Singh is Billionaire"
    res.send('<h1> Session create </h1>')
})
app.get('/getSession',(req,res)=>{ // now session access from any route with in session time
    if(req.session.username){
    res.send(`<h1> Session create : ${req.session.username} </h1>`)}
    else{ 
        res.send('Session not create')
    }
})

//delete session
app.get('/destroy',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.send('Error no session destroy')
        }else{
            res.send('<h1>session destroy</h1>')
        }
    })
})

app.listen(100,()=>{console.log('Server run on port 100')})