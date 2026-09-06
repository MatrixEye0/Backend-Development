const mongo = require('mongoose');

const urlSchema = new mongo.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true
    },
    visitHistory:
    [{timestamp:{type:Number}}],
    
},{timestamps:true});

const URL = mongo.model('URL',urlSchema);

module.exports = URL;