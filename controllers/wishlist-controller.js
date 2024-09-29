const Wishlist = require("../models/wishlist-model");
const Product = require("../models/product-model");

// Create a new wishlist for a user
const createWishlist = async (req, res) => {
  try {
    const { userId, items } = req.body;

    // Check if a wishlist already exists for the user
    let wishlist = await Wishlist.findOne({ user: userId });

    if (wishlist) {
      return res.status(400).json({ message: "Wishlist already exists" });
    }

    // Create a new wishlist
    const newWishlist = new Wishlist({
      user: userId,
      items: items || [],
    });

    await newWishlist.save();
    return res.status(201).json(newWishlist);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create wishlist", error });
  }
};

// Get the wishlist for a user
const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.findOne({ user: userId }).populate("items");

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    return res.status(200).json(wishlist);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to retrieve wishlist", error });
  }
};

// Add an item to a wishlist
const addItemToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, items: [] });
    }

    if (!wishlist.items.includes(productId)) {
      wishlist.items.push(productId);
    }

    await wishlist.save();
    return res.status(200).json(wishlist);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to add item to wishlist", error });
  }
};

// Remove an item from a wishlist
const removeItemFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.toString() !== productId
    );

    await wishlist.save();
    return res.status(200).json(wishlist);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to remove item from wishlist", error });
  }
};

// Delete a wishlist for a user
const deleteWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.findOneAndDelete({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    return res.status(200).json({ message: "Wishlist deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete wishlist", error });
  }
};

module.exports = {
  createWishlist,
  getWishlist,
  addItemToWishlist,
  removeItemFromWishlist,
  deleteWishlist,
};
