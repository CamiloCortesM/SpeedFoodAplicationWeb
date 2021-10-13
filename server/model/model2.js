const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    type : {
        type : String,
        required: true
    },
    name : {
        type: String,
        required: true,
        unique: true
    },
    description : String,
    price : Number
})

const Productodb = mongoose.model('productodb', schema);

module.exports = Productodb;