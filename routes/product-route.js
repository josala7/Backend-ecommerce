const express = require("express");
const productController = require("../controllers/product-controller");
const router = express.Router();

router.post("/", productController.createProduct);
router.get("/", productController.readAllProducts);
router.post("/:id", productController.readProductById);

router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

router.get("/filter", productController.filterProductsByPrice);

module.exports = router;
