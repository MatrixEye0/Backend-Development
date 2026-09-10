const express = require('express')
const app = express()
const mongoose = require('mongoose')
const contact = require('./models/contacts.model')

//import form validator
const {body, validationResult} = require('express-validator')

const port = 1000

//DB connect
const connect = mongoose.connect('mongodb://127.0.0.1:27017/contact')
.then(()=>console.log('DB connect'))

//middleware  -> types-> application level (apply to all), router level (on specific route), error handling, built in , third-party .
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

// validation checker
var validationRegistration = [
    body('first_name').notEmpty().withMessage('First Name Required'),
    body('last_name'),
    body('email').isEmail().withMessage('Email in proper format'),
    body('phone').isMobilePhone().isLength({min:10,max:10}).withMessage('Invalid Number'),
    body('address').notEmpty()
]

// routes
app.get('/', async(req,res)=>{
    // const contacts = await contact.find() now use paginate which show limited row which i want to show

    const { page=1,limit=10} = req.query // http://localhost:1000/?page=3  you find page like this
    const  options ={
        page:parseInt(page),
        limit: parseInt(limit) // this mean how many row show in one time
    }
    const contacts = await contact.paginate({}, options)
    // res.send(result)
   res.render('home',{contacts})
})

app.get('/show-contact/:id',async(req,res)=>{
    const contacts = await contact.findById( req.params.id )
    res.render('show-contact', {contacts})
})

app.get('/add-contact',(req,res)=>{
    res.render('add-contact')
})

app.post('/add-contact',validationRegistration,async(req,res)=>{
    // const contacts = await contact.insertOne({
    //     first_name:req.body.first_name ,
    //     last_name: req.body.last_name ,
    //     email: req.body.email,
    //     phone: req.body.phone,
    //     address: req.body.address
    // }) mongodb method long type
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.render('add-contact', {
            errors: errors.array(),
            oldData: req.body
        })
    }
    await contact.create(req.body)
    res.redirect('/')
})

app.get('/update-contact/:id',async(req,res)=>{
    const contacts = await contact.findById( req.params.id )
    res.render('update-contact', {contacts})
})

app.post('/update-contact/:id',async(req,res)=>{
    await contact.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/')
})

app.get('/delete-contact/:id',async(req,res)=>{
    await contact.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

app.listen(port,()=>{console.log(`Port ${port}: Connected`);})