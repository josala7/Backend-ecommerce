const Product = require("../models/product-model");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const readAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const readProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).exec();
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const filterProductsByPrice = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;

    let filter = {};

    if (minPrice) {
      filter.price = { ...filter.price, $gte: parseFloat(minPrice) };
    }
    if (maxPrice) {
      filter.price = { ...filter.price, $lte: parseFloat(maxPrice) };
    }

    const products = await Product.find(filter);

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  readAllProducts,
  readProductById,
  updateProduct,
  deleteProduct,
  filterProductsByPrice,
};
