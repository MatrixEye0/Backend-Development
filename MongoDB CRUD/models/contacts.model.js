const mongoose = require('mongoose')

const schema= mongoose.Schema({
    first_name:{type:String},
    last_name:{type:String},
    email:{type:String , unique:true},
    phone:{type:String ,unique:true},
    address:{type:String}
})

const contact = mongoose.model('Contact', schema)

module.exports = contact