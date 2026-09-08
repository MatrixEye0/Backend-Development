const exp = require('express')
const app = exp()
const port = 5000

app.set('view engine', 'ejs') //view engine tell "When I use res.render(), which engine should I use to process the file?" and file i give by say ejs
app.use(exp.urlencoded({extended:false}))
app.use(exp.static('public'))


app.get('/',(req,res)=>{
    res.send("Hello")
})
app.get('/about',(req,res)=>{
    var user =[
        {name:"Jagjit Singh", age:22, city:"Delhi"},
        {name:"Jagjit Singh", age:22, city:"Delhi"},
        {name:"Jagjit Singh", age:22, city:"Delhi"}
    ] 
    res.render('about',{ title:"About Page", items:user})
})

app.get('/form',(req,res)=>{
    res.render('form',{message:null})
})
app.post('/submit',(req,res)=>{
    const name = req.body.myname
    const message = `Hello ${name}`
    res.render('form',{message:message})
})

app.listen(port,()=>{ console.log(`Port ${port}: Connected`)})