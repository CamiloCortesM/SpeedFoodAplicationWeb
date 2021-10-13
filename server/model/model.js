 const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    gender : String,
    age : String
})



const Domiciliariodb = mongoose.model('domiciliariodb', schema);


module.exports = Domiciliariodb;

