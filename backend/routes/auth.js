const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
      const { name, email, password } = req.body;

      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: 'User already exists' });

      const salt = await bcrypt.genSalt(10);
      user = new User({
        name,
        email,
        password: await bcrypt.hash(password, salt),
      });

      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error occurred' });
    }
  });

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: 'Server error occurred' });
    }
  });

module.exports = router;
