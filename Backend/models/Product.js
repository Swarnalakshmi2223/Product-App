const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:100
    },


    price:{
        type:Number,
        required:true,
        min:0
    },


    image:{
        type:String,
        required:true
    },


    rating:{
        type:Number,
        required:true,
        min:0,
        max:5
    }


});


const Product = mongoose.model(
    "Product",
    productSchema
);


module.exports = Product;