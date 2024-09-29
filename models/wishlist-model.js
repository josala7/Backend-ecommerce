const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const whishlistSchema = new Schema({
  items: [
    { type: Schema.Types.ObjectId, ref: "Product" },
    // quantity: { type: Number, default: 1, required: true },
  ],
  user: { type: Schema.Types.ObjectId, ref: "User" },
});
const Wishlist = mongoose.model("Wishlist", whishlistSchema);

module.exports = Wishlist;
