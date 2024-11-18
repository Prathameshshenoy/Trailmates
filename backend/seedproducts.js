require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

  const sampleProducts = [
    {
      name: "Hiking Boots",
      price: 20000,
      description: "Durable and comfortable boots for all terrains.",
      image: "/images/Products/hiking_boots.jpg",
      category: "footwear",
      quantity: 10
    },
    {
      name: "Waterproof Backpack",
      price: 1999,
      description: "Spacious backpack with waterproof coating.",
      image: "/images/Products/backpack.jpg",
      category: "bags",
      quantity: 15
    },
    {
      name: "Trekking Poles",
      price: 1500,
      description: "Lightweight and sturdy trekking poles for support.",
      image: "/images/Products/trekking_poles.jpg",
      category: "accessories",
      quantity: 20
    },
    {
      name: "Insulated Jacket",
      price: 5000,
      description: "Warm and insulated jacket for cold weather hikes.",
      image: "/images/Products/insulated_jacket.jpg",
      category: "clothing",
      quantity: 8
    },
    {
      name: "Water Bottle",
      price: 499,
      description: "Stainless steel water bottle to keep your drink cool.",
      image: "/images/Products/water_bottle.jpg",
      category: "water bottles",
      quantity: 30
    },
    {
      name: "Sleeping Bag",
      price: 3000,
      description: "Compact and warm sleeping bag for overnight hikes.",
      image: "/images/Products/sleeping_bag.jpg",
      category: "accessories",
      quantity: 12
    },
    {
      name: "Headlamp",
      price: 800,
      description: "Bright and durable headlamp for night trekking.",
      image: "/images/Products/headlamp.jpg",
      category: "electronics",
      quantity: 25
    },
    {
      name: "Portable Stove",
      price: 2500,
      description: "Compact stove ideal for outdoor cooking.",
      image: "/images/Products/portable_stove.jpg",
      category: "accessories",
      quantity: 10
    },
    {
      name: "Rain Jacket",
      price: 1800,
      description: "Lightweight and waterproof rain jacket.",
      image: "/images/Products/rain_jacket.jpg",
      category: "clothing",
      quantity: 18
    },
    {
      name: "First Aid Kit",
      price: 600,
      description: "Compact first aid kit with essential items.",
      image: "/images/Products/first_aid_kit.jpg",
      category: "accessories",
      quantity: 40
    },
    {
      name: "Camping Chair",
      price: 1200,
      description: "Foldable camping chair for rest breaks.",
      image: "/images/Products/camping_chair.jpg",
      category: "accessories",
      quantity: 15
    },
    {
      name: "GPS Device",
      price: 8500,
      description: "Handheld GPS device for navigation on trails.",
      image: "/images/Products/gps_device.jpg",
      category: "electronics",
      quantity: 5
    },
    {
      name: "Solar Charger",
      price: 3000,
      description: "Portable solar charger for electronic devices.",
      image: "/images/Products/solar_charger.jpg",
      category: "electronics",
      quantity: 7
    },
    {
      name: "Compass",
      price: 400,
      description: "Essential compass for navigation in the wilderness.",
      image: "/images/Products/compass.jpg",
      category: "navigation",
      quantity: 50
    },
    {
      name: "Trail Snacks",
      price: 150,
      description: "High-energy trail mix to keep you fueled.",
      image: "/images/Products/trail_snacks.jpg",
      category: "food",
      quantity: 60
    },
    {
      name: "Binoculars",
      price: 2500,
      description: "Compact binoculars for nature viewing.",
      image: "/images/Products/binoculars.jpg",
      category: "accessories",
      quantity: 10
    },
    {
      name: "Gaiters",
      price: 700,
      description: "Water-resistant gaiters to protect your boots and legs.",
      image: "/images/Products/gaiters.jpg",
      category: "clothing",
      quantity: 15
    },
    {
      name: "Fire Starter Kit",
      price: 350,
      description: "Compact fire starter kit for emergency situations.",
      image: "/images/Products/fire_starter_kit.jpg",
      category: "accessories",
      quantity: 20
    },
    {
      name: "Trail Map",
      price: 100,
      description: "Detailed trail map for planning routes.",
      image: "/images/Products/trail_map.jpg",
      category: "navigation",
      quantity: 100
    },
    {
      name: "Portable Water Filter",
      price: 1500,
      description: "Filter for safe drinking water from natural sources.",
      image: "/images/Products/water_filter.jpg",
      category: "water bottles",
      quantity: 12
    }
  ];
  
  

async function seedProductDatabase() {
  try {
    await Product.deleteMany({});
    console.log("Existing products removed");

    await Product.insertMany(sampleProducts);
    console.log("Sample products inserted");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error inserting sample products:", err);
  }
}

seedProductDatabase();
