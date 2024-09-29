const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlist-controller");

router.post("/create", wishlistController.createWishlist);
router.get("/:userId", wishlistController.getWishlist);
router.post("/add", wishlistController.addItemToWishlist);
router.post("/remove", wishlistController.removeItemFromWishlist);
router.delete("/:userId", wishlistController.deleteWishlist);

module.exports = router;
