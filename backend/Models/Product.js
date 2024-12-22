const mongoose = require("mongoose")
const ProductDetailSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    images:[{
        imageUrl:{
            type:String,
            required:true
        }
    }],
    category:[{
      type:String,
      required:true  
    }],
    rating:{type:String}
},{collection:"productInfo",});
const Product =  mongoose.model("ProductInfo",ProductDetailSchema);
module.exports=Product;

