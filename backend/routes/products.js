const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
});

router.patch('/:id/decrement', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.quantity < quantity) {
      return res.status(400).json({ message: `Only ${product.quantity} items in stock` });
    }

    product.quantity -= quantity;
    await product.save();

    res.json({ message: 'Product quantity updated', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/:id/update-stock', async (req, res) => {
  try {
    const { quantityChange } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.quantity += quantityChange;
    await product.save();

    res.status(200).json({ message: 'Stock updated successfully', quantity: product.quantity });
  } catch (error) {
    res.status(500).json({ message: 'Error updating stock', error });
  }
});

module.exports = router;
