const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    Date : {
        type : String,
        required: true
    },
    name : {
        type : String,
        required: true
    },
    address : {
        type: String,
        required: true,
    },
    telephone : Number,
    nameDomic : {
        type : String,
        required: true
    },
    TypeProduct : String,
    NameProduct : String,
    price : {
        type:Number,
        required:true
    },
    priceTotal : {
        type:Number,
        required:true
    },
    earnings:Number
})

const Pedidodb = mongoose.model('pedidodb', schema);

module.exports = Pedidodb;