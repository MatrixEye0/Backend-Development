const mongoose = require('mongoose')

//import pagination
const mongoosePaginate = require('mongoose-paginate-v2')

const schema= mongoose.Schema({
    first_name:{type:String},
    last_name:{type:String},
    email:{type:String , unique:true},
    phone:{type:String ,unique:true},
    address:{type:String}
})
// paginate use here
schema.plugin(mongoosePaginate)

const contact = mongoose.model('Contact', schema)

module.exports = contact