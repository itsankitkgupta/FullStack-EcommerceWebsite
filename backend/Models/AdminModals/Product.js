const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    ProductName:{
        type:String,

    },
    ProductType:{
    type:String,
    },
    Price:{
        type:String,
    },
    Manufacturer:{
  type:String,
    },
    Description:{
        type:String,
    },
    Image:{
        type:String
    },
    Date:{
        type:Date,
default:Date.now()
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps: true })

const Product = mongoose.model("Products",schema)
module.exports = Product;