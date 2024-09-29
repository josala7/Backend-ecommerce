const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create new schema
const productSchema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  discount: Number,
  description: String,
});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
