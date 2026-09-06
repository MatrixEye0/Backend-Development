const express = require ('express')
const fs = require('fs')
const user= require('./MOCK_DATA.json')// import user 
const mongo = require('mongoose')


const app = express();
const port = 3000;

//connect mongoDB
mongo.connect('mongodb://127.0.0.1:27017/nameOfDb')
.then(()=>console.log('MongoDb Connected'))
.catch((err)=>console.log(err))

//mongo schema
const userSchema = new mongo.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        uniquie:true
    },
    gender:{
        type:String,
    },
    job_Title:{
        type:String,
    }
},{timestamps:true})// timestamp tell data kitne baje create hua aur update hua

const User = mongo.model('User',userSchema)

// Rest API
app.get('/',(req,res)=>{
    return res.json(user)
});
app.get('/users', async (req,res)=>{
    const allDBusers = await User.find({})// empty mean take all user
    const html = `<ul>${allDBusers.map(user=>`<li>${user.first_name} ${user.last_name} - ${user.gender} - ${user.email} - ${user.job_Title} </li>`).join(' ') }</ul>`
    res.send(html)
});

//Dynamic path parameter
app.get('/user/:id',(req,res)=>{
    const id = Number(req.params.id);
    const founduser = user.find((user)=>user.id===id);
    return res.json(founduser)
});

// Middleware and more about you learn in express website -> execute code, make change in req and res, end req-res cycle, call next middleware function in stack
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware one example
app.use((req,res,next)=>{
    fs.appendFile('./log.txt',`\n${req.method} ${req.path} ${new Date().toISOString()}` ,
    (err,data)=>{
        next();// call next middleware function in stack
    })
})

// POST request
app.post('/userpost', (req, res) => {
    // console.log(req.body); 

    const newUser = req.body;

    // user.push({ ...newUser,  id: user.length + 1  });
    // fs.writeFileSync( './MOCK_DATA.json', JSON.stringify(user, null, 2) );
    // return res.status(201).json({ status: "success",   user: newUser });

   User.create({
    first_name:newUser.first_name,
    last_name:newUser.last_name,
    email:newUser.email,
    gender:newUser.gender,
    job_Title:newUser.job_Title
   })
    return res.status(201).json({staus:"Done", user:newUser})

});

//patch and delete request
app.route('/users/:id')
.get(async(req,res)=>{
    const user = await User.findById(req.params.id)
})
.patch(async(req,res)=>{
     await User.findByIdAndUpdate(req.params.id,{job_Title: "Emperor"});
     return res.json({message:`User with id ${req.params.id} updated`})
})
.delete(async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    return res.json({message:`User with id ${req.params.id} delete`})
})

app.listen(port, ()=>console.log(`Server is running on port ${port}`));

