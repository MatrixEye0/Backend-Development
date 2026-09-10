const express = require('express')
const app = express()
const path = require('path')
const multer = require('multer')
const mongo = require('mongoose')

const port = 2000

// middleware
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//storage
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
       callback(null,'./uploads')// all upload data store at upload folder
    },
    filename:(req,file,callback)=>{
        const newFilename = Date.now()+path.extname(file.originalname) // path.extname give file extention like pdf jpg of file which inside it
         callback(null,newFilename)
    }
})

const fileFilter = (req, file, callback)=>{ // this mean we allow only specific type of file which we allow in if statement
    if(file.mimetype.startsWith('image/png') || file.mimetype.startsWith('image/pdf') ){
       callback(null, true)
    }else{
         callback(new error ('this format not allowed'),false)
    }
}

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024*1024*5,
    },
    fileFilter:fileFilter// here declare file filter
})


// route
app.get('/',(req,res)=>{
      res.render('form')
})

app.post('/form-submit',upload.single('profile'),(req,res)=> {
    // if want upload multiple file so we use upload.array('profile',5(limit how many file)) and for this also add in html as multiple="multiple"
    // for upload multiple field form in diffrent upload option so we use upload.fields([{inside here tell which file and how many file},{ name: "profile", maxCount:3}])
    res.send(req.file)
})


app.listen(port, ()=>{
    console.log(`Port ${port} Started`)
})