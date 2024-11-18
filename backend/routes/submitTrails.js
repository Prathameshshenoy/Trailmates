const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Trail = require('../models/Trail');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'images', 'User');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/submit', upload.array('image'), async (req, res) => {
    if (!req.files) {
      return res.status(400).json({ message: 'No files were uploaded' });
    }
  
    try {
      const trailData = req.body;
      const reviews = Array.isArray(trailData.reviews) ? trailData.reviews : [];
      const imageUrls = req.files.map(file => `/images/User/${file.filename}`);
  
      const newTrail = new Trail({
        ...trailData,
        reviews: reviews,
        images: imageUrls,
      });
  
      await newTrail.save();
      res.status(201).json({ message: 'Trail submitted successfully', trail: newTrail });
    } catch (error) {
      console.error('Error submitting trail:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
