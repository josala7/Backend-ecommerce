const express = require("express");
const router = express.Router();

// ROUTES
const authRoutes = require("./auth-route");
const productsRoutes = require("./product-route");
const cartRoutes = require("./cart-route");
const wishlistRoutes = require("./routes/wishlist");

router.use("/auth", authRoutes);
router.use("/products", productsRoutes);
router.use("/cart", cartRoutes);
app.use("/wishlist", wishlistRoutes);

module.exports = router;
