require("dotenv").config();
const mongoose = require("mongoose");
const Trail = require("./models/Trail");

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const sampleTrails = [

  // Bengaluru Trails

  {
    name: "Cubbon Park Walk",
    difficulty: "Easy",
    length: "2.0 miles",
    images: [
      "/images/Bengaluru/Cubbon_Park_Walk_Pics/cubbonpark1.jpg",
      "/images/Bengaluru/Cubbon_Park_Walk_Pics/cubbonpark2.jpg",
      "/images/Bengaluru/Cubbon_Park_Walk_Pics/cubbonpark3.jpg",
      "/images/Bengaluru/Cubbon_Park_Walk_Pics/cubbonpark4.jpg",
      "/images/Bengaluru/Cubbon_Park_Walk_Pics/cubbonpark5.jpg"
    ],
    elevation: "300 ft",
    location: "Cubbon Park",
    city: "Bengaluru",
    reviews: [
      { user: "Shreya Rao", rating: 5, comment: "Perfect place for a peaceful walk or jog in the city." },
      { user: "Nikhil Desai", rating: 4, comment: "Greenery and calmness in the heart of Bengaluru." },
    ],
    approved: true

  },
  {
    name: "Skandagiri Trek",
    difficulty: "Moderate",
    length: "5.2 miles",
    images: [
      "/images/Bengaluru/Skandagiri_Trek_Pics/skandagiri1.jpg",
      "/images/Bengaluru/Skandagiri_Trek_Pics/skandagiri2.jpg",
      "/images/Bengaluru/Skandagiri_Trek_Pics/skandagiri3.jpg",
      "/images/Bengaluru/Skandagiri_Trek_Pics/skandagiri4.jpg",
    ],
    elevation: "4757 ft",
    location: "Chikkaballapur",
    city: "Bengaluru",
    reviews: [
      { user: "Amit Sharma", rating: 4, comment: "Beautiful trek with amazing sunrise views!" },
      { user: "Priya Desai", rating: 5, comment: "An unforgettable experience!" },
    ],
    approved: true

  },
  {
    name: "Nandi Hills",
    difficulty: "Easy",
    length: "3.1 miles",
    images: [
      "/images/Bengaluru/Nandi_Hills_Pics/nandi1.jpg",
      "/images/Bengaluru/Nandi_Hills_Pics/nandi2.jpg",
      "/images/Bengaluru/Nandi_Hills_Pics/nandi3.jpg",
      "/images/Bengaluru/Nandi_Hills_Pics/nandi4.jpg",
      "/images/Bengaluru/Nandi_Hills_Pics/nandi5.jpg"
    ],
    elevation: "4851 ft",
    location: "Nandi Hills",
    city: "Bengaluru",
    reviews: [
      { user: "Rahul Patel", rating: 4, comment: "Perfect for a weekend getaway." },
      { user: "Sneha Kapoor", rating: 3, comment: "Nice spot, but it gets crowded." },
    ],
    approved: true

  },

  {
    name: "Lalbagh Garden Trail",
    difficulty: "Easy",
    length: "2 miles",
    images: [
      "/images/Bengaluru/Lalbagh_Trail_Pics/lalbaugh1.jpg",
      "/images/Bengaluru/Lalbagh_Trail_Pics/lalbaugh2.jpg",
      "/images/Bengaluru/Lalbagh_Trail_Pics/lalbaugh3.jpg",
      "/images/Bengaluru/Lalbagh_Trail_Pics/lalbaugh4.jpg",
      "/images/Bengaluru/Lalbagh_Trail_Pics/lalbaugh5.jpg"
    ],
    elevation: "1200 ft",
    location: "Lalbagh",
    city: "Bengaluru",
    reviews: [
      { user: "Ravi Kumar", rating: 4, comment: "Beautiful garden with plenty of scenic views!" },
      { user: "Sanya Gupta", rating: 5, comment: "A peaceful place to enjoy nature and the flora." },
    ],
    approved: true

  },
  {
    name: "Savandurga",
    difficulty: "Hard",
    length: "8.7 miles",
    images: [
      "/images/Bengaluru/Savandurga_Pics/savandurga1.jpg",
      "/images/Bengaluru/Savandurga_Pics/savandurga2.jpg",
      "/images/Bengaluru/Savandurga_Pics/savandurga3.jpg",
      "/images/Bengaluru/Savandurga_Pics/savandurga4.jpg",
      "/images/Bengaluru/Savandurga_Pics/savandurga5.jpg"
    ],
    elevation: "4022 ft",
    location: "Magadi",
    city: "Bengaluru",
    reviews: [
      { user: "Karthik Nair", rating: 5, comment: "Challenging but the view from the top is unbeatable!" },
      { user: "Ayesha Khan", rating: 4, comment: "Intense climb, bring lots of water!" },
    ],
    approved: true

  },
 
  {
    name: "Makalidurga",
    difficulty: "Moderate",
    length: "6.2 miles",
    images: [
      "/images/Bengaluru/Makalidurga_Pics/makalidurga1.jpg",
      "/images/Bengaluru/Makalidurga_Pics/makalidurga2.jpg",
      "/images/Bengaluru/Makalidurga_Pics/makalidurga3.jpg",
      "/images/Bengaluru/Makalidurga_Pics/makalidurga4.jpg",
      "/images/Bengaluru/Makalidurga_Pics/makalidurga5.jpg"
    ],
    elevation: "4430 ft",
    location: "Doddaballapur",
    city: "Bengaluru",
    reviews: [
      { user: "Deepak Verma", rating: 4, comment: "Nice trek with wonderful lake views." },
      { user: "Anjali Mehta", rating: 5, comment: "Lovely trek, especially during monsoon!" },
    ],
    approved: true

  },
  {
    name: "Kunti Betta",
    difficulty: "Easy",
    length: "4.3 miles",
    images: [
      "/images/Bengaluru/Kunti_Betta_Pics/kunti1.jpg",
      "/images/Bengaluru/Kunti_Betta_Pics/kunti2.jpg",
      "/images/Bengaluru/Kunti_Betta_Pics/kunti3.jpg",
      "/images/Bengaluru/Kunti_Betta_Pics/kunti4.jpg",
      "/images/Bengaluru/Kunti_Betta_Pics/kunti5.jpg"
    ],
    elevation: "2882 ft",
    location: "Mandya",
    city: "Bengaluru",
    reviews: [
      { user: "Manoj Jain", rating: 3, comment: "Good beginner trek, but needs better markings." },
      { user: "Ritika Chawla", rating: 4, comment: "Fun and easy! Great for a day trip." },
    ],
    approved: true

  },
 

 // Mumbai City Trails
 {
  name: "Marine Drive Promenade Walk",
  difficulty: "Easy",
  length: "3.0 miles",
  images: [
    "/images/Mumbai/Marine_Drive_Pics/marine1.jpg",
    "/images/Mumbai/Marine_Drive_Pics/marine2.jpg",
    "/images/Mumbai/Marine_Drive_Pics/marine3.jpg",
    "/images/Mumbai/Marine_Drive_Pics/marine4.jpg",
    "/images/Mumbai/Marine_Drive_Pics/marine5.jpg"
  ],
  elevation: "30 ft",
  location: "Marine Drive",
  city: "Mumbai",
  reviews: [
    { user: "Rina Thakur", rating: 5, comment: "Breathtaking views along the coast, especially at sunset!" },
    { user: "Vikram Khanna", rating: 4, comment: "Perfect for a relaxed walk by the sea." },
  ],
  approved: true

},
{
  name: "Priyadarshini Park Trail",
  difficulty: "Easy",
  length: "1.5 miles",
  images: [
    "/images/Mumbai/PDP_Pics/pdp1.jpg",
    "/images/Mumbai/PDP_Pics/pdp2.jpg",
    "/images/Mumbai/PDP_Pics/pdp3.jpg",
    "/images/Mumbai/PDP_Pics/pdp4.jpg",
    "/images/Mumbai/PDP_Pics/pdp5.jpg"
  ],
  elevation: "50 ft",
  location: "Malabar Hill",
  city: "Mumbai",
  reviews: [
    { user: "Alka Patel", rating: 4, comment: "Beautiful coastal trail, perfect for a morning jog." },
    { user: "Deepak Desai", rating: 5, comment: "Peaceful park with well-maintained pathways." },
  ],
  approved: true

},
{
  name: "Sanjay Gandhi National Park - Kanheri Caves Trail",
  difficulty: "Moderate",
  length: "4.5 miles",
  images: [
    "/images/Mumbai/Sanjay_Gandhi_Pics/kanheri1.jpg",
    "/images/Mumbai/Sanjay_Gandhi_Pics/kanheri2.jpg",
    "/images/Mumbai/Sanjay_Gandhi_Pics/kanheri3.jpg",
    "/images/Mumbai/Sanjay_Gandhi_Pics/kanheri4.jpg",
    "/images/Mumbai/Sanjay_Gandhi_Pics/kanheri5.jpg"
  ],
  elevation: "600 ft",
  location: "Borivali East",
  city: "Mumbai",
  reviews: [
    { user: "Rohit Nair", rating: 5, comment: "Fantastic trail with historic caves and natural beauty!" },
    { user: "Meera Joshi", rating: 4, comment: "Great for a weekend hike, lots of monkeys around." },
  ],
  approved: true

},
{
  name: "Madh Fort Beach Trail",
  difficulty: "Easy",
  length: "3.0 miles",
  images: [
    "/images/Mumbai/Madh_Pics/madh1.jpg",
    "/images/Mumbai/Madh_Pics/madh2.jpg",
    "/images/Mumbai/Madh_Pics/madh3.jpg",
    "/images/Mumbai/Madh_Pics/madh4.jpg",
    "/images/Mumbai/Madh_Pics/madh5.jpg"
  ],
  elevation: "150 ft",
  location: "Madh Island",
  city: "Mumbai",
  reviews: [
    { user: "Priya Shah", rating: 4, comment: "Scenic trail along the beach, perfect for a relaxing walk." },
    { user: "Vivek Patel", rating: 4, comment: "Easy trail with great views of the sea and fort ruins." },
  ],
  approved: true
},
{
  name: "Maharashtra Nature Park Trail",
  difficulty: "Easy",
  length: "2.0 miles",
  images: [
    "/images/Mumbai/Maharashtra_Nature_Park/maharashtra1.jpg",
    "/images/Mumbai/Maharashtra_Nature_Park/maharashtra2.jpg",
    "/images/Mumbai/Maharashtra_Nature_Park/maharashtra3.jpg",
    "/images/Mumbai/Maharashtra_Nature_Park/maharashtra4.jpg",
    "/images/Mumbai/Maharashtra_Nature_Park/maharashtra5.jpg"
  ],
  elevation: "80 ft",
  location: "Dharavi",
  city: "Mumbai",
  reviews: [
    { user: "Suresh Kumar", rating: 4, comment: "A hidden gem with lots of greenery and bird sightings." },
    { user: "Neha Gupta", rating: 5, comment: "Great place for nature walks right in the city!" },
  ],
  approved: true

},

{
  name: "Powai Lake Trail",
  difficulty: "Easy",
  length: "2.5 miles",
  images: [
    "/images/Mumbai/Powai_Lake/powai1.jpg",
    "/images/Mumbai/Powai_Lake/powai2.jpg",
    "/images/Mumbai/Powai_Lake/powai3.jpg",
    "/images/Mumbai/Powai_Lake/powai4.jpg",
    "/images/Mumbai/Powai_Lake/powai5.jpg"
  ],
  elevation: "60 ft",
  location: "Powai",
  city: "Mumbai",
  reviews: [
    { user: "Arjun Shah", rating: 4, comment: "Great place for a lakeside walk; peaceful and scenic." },
    { user: "Radhika Menon", rating: 5, comment: "Lovely trail with good views and lots of birdlife." },
  ],
  approved: true

},

{
  name: "Gilbert Hill Viewpoint",
  difficulty: "Easy",
  length: "1.0 miles",
  images: [
    "/images/Mumbai/Gilbert_Hill/gilbert1.jpg",
    "/images/Mumbai/Gilbert_Hill/gilbert2.jpg",
   
  ],
  elevation: "200 ft",
  location: "Andheri West",
  city: "Mumbai",
  reviews: [
    { user: "Nikhil Jain", rating: 3, comment: "Unique rock formation with a great view from the top." },
    { user: "Sonal Mishra", rating: 4, comment: "Short trail, but a nice place to relax and enjoy the view." },
  ],
  approved: true

},

  // Delhi Trails
  {
    name: "Asola Bhatti Trek",
    difficulty: "Easy",
    length: "4.5 miles",
    images: [
      "/images/Delhi/Asola_Bhatti_Wildlife_Sanctuary_Trek_Pics/asola1.jpg",
      "/images/Delhi/Asola_Bhatti_Wildlife_Sanctuary_Trek_Pics/asola2.jpg",
     
    ],
    elevation: "700 ft",
    location: "Asola",
    city: "Delhi",
    reviews: [
      { user: "Suman Arora", rating: 4, comment: "A great place for bird watchers and nature lovers." },
      { user: "Karan Mehta", rating: 5, comment: "Lovely trek with peaceful surroundings." },
    ],
    approved: true

  },
  {
    name: "Surajkund Trek",
    difficulty: "Moderate",
    length: "5.5 miles",
    images: [
      "/images/Delhi/Surajkund_Trek_Pics/surajkund1.jpg",
      "/images/Delhi/Surajkund_Trek_Pics/surajkund2.jpg",
    
    ],
    elevation: "600 ft",
    location: "Faridabad",
    city: "Delhi",
    reviews: [
      { user: "Anil Kumar", rating: 4, comment: "Nice weekend trek to unwind from city life." },
      { user: "Ritika Arora", rating: 5, comment: "Beautiful countryside and peaceful trek." },
    ],
    approved: true

  },
  // Add more trails 
];

async function seedDatabase() {
  try {
    await Trail.deleteMany({});
    console.log("Existing trails removed");

    await Trail.insertMany(sampleTrails);
    console.log("Sample trails inserted");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error inserting sample trails:", err);
  }
}

seedDatabase();
