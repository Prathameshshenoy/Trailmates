const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

const trailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  city: { type: String, required: true },
  difficulty: { type: String, required: true },
  length: { type: String, required: true },
  elevation: { type: String, required: true },
  images: [String],
  reviews: { type: [reviewSchema], default: [] },
  approved: { type: Boolean, default: false }
});

const Trail = mongoose.model('Trail', trailSchema);

module.exports = Trail;
