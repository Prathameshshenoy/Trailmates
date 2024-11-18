const express = require('express');
const Trail = require('../models/Trail');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { city } = req.query;
    let filter = {};

    if (city) {
      filter.city = { $regex: city, $options: 'i' };
    }

    const trails = await Trail.find(filter);
    res.status(200).json(trails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trails' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const trail = await Trail.findById(req.params.id);
    if (!trail) return res.status(404).json({ message: 'Trail not found' });
    res.json(trail);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const { user, comment, rating } = req.body;

    if (!user || !comment || !rating) {
      return res.status(400).json({ message: "All fields (user, comment, rating) are required" });
    }

    const trail = await Trail.findById(id);
    if (!trail) {
      return res.status(404).json({ message: "Trail not found" });
    }

    trail.reviews.push({ user, comment, rating });
    await trail.save();
    
    res.status(201).json(trail);
  } catch (error) {
    res.status(500).json({ message: "Server error occurred" });
  }
});

router.delete('/:id/reviews/:reviewId', authenticateToken, async (req, res) => {
  const { id, reviewId } = req.params;
  const userName = req.user.name;
  const requestUserName = req.headers['x-user-name'];

  try {
    const trail = await Trail.findById(id);
    if (!trail) {
      return res.status(404).json({ message: 'Trail not found' });
    }

    const review = trail.reviews.id(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user !== requestUserName) {
      return res.status(403).json({ message: 'You can only delete your own review' });
    }

    trail.reviews.pull(reviewId);
    await trail.save();

    res.status(200).json(trail);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review' });
  }
});

module.exports = router;
