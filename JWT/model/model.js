const mongo = require('mongoose')

const schema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    createAt:{
     type:Date,
     default:Date.now
    }
})
const User = mongoose.model('User',schema)
module.exports=User
