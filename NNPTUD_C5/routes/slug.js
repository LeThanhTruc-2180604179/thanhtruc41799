var express = require('express');
var router = express.Router();
let productModel = require('../schemas/product');
let CategoryModel = require('../schemas/category');

// API: Lấy tất cả sản phẩm theo slug của category
router.get('/:category', async function(req, res, next) {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.category });
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    let products = await productModel.find({ category: category._id }).populate("category");
    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// API: Lấy 1 sản phẩm theo slug của category và slug của product
router.get('/:category/:product', async function(req, res, next) {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.category });
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    let product = await productModel.findOne({
      slug: req.params.product,
      category: category._id
    }).populate("category");

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
