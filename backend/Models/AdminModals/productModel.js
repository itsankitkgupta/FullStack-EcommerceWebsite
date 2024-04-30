const mongoose = require("mongoose");
 
const productSchema = new mongoose.Schema({
  ProductName: {
    type: String,
    required: true,
  },
  ProductType: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Manufacturer: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
  },
  Image: {
    type: String,
    required: true,
  },
});
 
const Product = mongoose.model("Product", productSchema);
 
module.exports = Product;