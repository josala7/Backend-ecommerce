const Cart = require("../models/cart-model");

// get user cart
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.userId }).populate(
      "items.product"
    );
    if (!cart) {
      cart = await Cart.create({ user: req.user.userId, items: [] });
    }
    res.status(200).json({ message: "Success!", cart });
  } catch (e) {
    res.status(500).json({ message: "Server error!" });
  }
};

//  const addProductToCart =>{}
const mergeCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId });
    const productList = req.body;

    productList.forEach((item) => {
      cart.items.push({
        product: item._id,
        quantity: item.quantity,
      });
    });

    await cart.save();

    res.status(200).json({ message: "Success!", cart });
  } catch (e) {
    res.status(500).json({ message: "Server error!" });
  }
};

module.exports = {
  getCart,
  mergeCart,
};
