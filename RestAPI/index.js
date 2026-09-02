const express = require ('express')
const fs = require('fs')
const user= require('./MOCK_DATA.json')// import user 

const app = express();
const port = 3000;

// Rest API
app.get('/',(req,res)=>{
    return res.json(user)
});
app.get('/users',(req,res)=>{
    const html = `<ul>${user.map(user=>`<li>${user.id} ${user.first_name} ${user.last_name}</li>`).join('') }</ul>`
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
        next();
    })
})

// POST request
app.post('/userpost', (req, res) => {
       // console.log(req.body); 
    const newUser = req.body;
    
    user.push({ ...newUser,  id: user.length + 1  });

    fs.writeFileSync( './MOCK_DATA.json', JSON.stringify(user, null, 2) );

    return res.status(201).json({ status: "success",   user: newUser });
});

//patch request
app.patch('/user/:id',(req,res)=>{
    const id = Number(req.params.id);
   
});

// delete request
app.delete('/user/:id',(req,res)=>{
    return res.json({message:`User with id ${res.prams.id} delete`})
})

app.listen(port, ()=>console.log(`Server is running on port ${port}`));

