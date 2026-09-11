const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const User = require('./model/model')
const dotenv= require('dotenv')
const auth = require('./middleware/check')

const app = express();
const PORT = 7000;

// Built-in middleware
app.use(express.json());
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: false }));

// Custom middleware
app.use((req, res, next) => {
    next();
});

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>");
});

app.get("/register", (req, res) => {
    res.render('register');
});
app.post("/register", async(req, res) => {
    const {username, email, password}= req.body
    const existingUser =  await User.findOne({$or:[{username},{email}]})
    if(existingUser) return res.status(400).json({message:"Username and Email already exist"});

    const hashPass = await bcrypt.hash(password,10)
    const user = new User({username,email,password:hashPass})
    const saveUser = await user.save()

    res.json(saveUser)
});

app.get("/login", async(req, res) => {
    // const {username, password}=req.body
    // const user = await User.findOne({username})
    // if(!user) return res.status(404).json({message:"User not found"})

    // const isMatch = await bcrypt.compare(password, user.password)
    // if(!isMatch) return res.status(404).json({message:"password not match"}) 
        
    //     const token= jwt.sign({userId:user._id, username:user.username, },
    //         process.env.JWT_SECRET,
    //         {expiresIn:'1h'}
    //     )
   res.render('login')     

});
app.post("/login", auth,async(req, res) => {
    try{
          const {username, password}=req.body
    const user = await User.findOne({username})
    if(!user) return res.status(404).json({message:"User not found"})

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(404).json({message:"password not match"}) 
        
        const token= jwt.sign({userId:user._id, username:user.username, },
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )
   res.json({token}) 
    }catch(err){
      res.status(500).json({message:err.message})
    }
});

// error page middleware
app.use((req, res) => {
    res.status(404).send("<h1>404 - Page Not Found</h1>");
});

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});