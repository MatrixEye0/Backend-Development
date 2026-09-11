const mongo = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();
mongo.connect(process.env.MONGO_URL)
 .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("MongoDB connection failed:", err.message);
    });

const schema = new mongo.Schema({
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
        required:true
    },
    createAt:{
     type:Date,
     default:Date.now
    }
})
const User = mongo.model('User',schema)
module.exports=User
