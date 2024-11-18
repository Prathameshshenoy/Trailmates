import React, { useEffect } from 'react';
import './about.css';

const About = () => {
  return (
    <div className="about-background">
      <div className="overlay"></div>
      <div className="about-container">
        <h1>About Us</h1>
        <p>Welcome to TrailMates! Our platform is dedicated to inspiring, guiding, and equipping hikers at every skill level. We believe that everyone should have the chance to experience the beauty of nature, discover hidden gems, and connect with a like-minded community of outdoor enthusiasts.</p>
        <p>At TrailMates, you'll find detailed trail guides, community-driven reviews, and a curated shop with everything you need to enhance your hiking journey.</p>
        
        <h2>Our Goal</h2>
        <p>Our goal is to make the outdoors accessible and enjoyable for everyone. We strive to empower hikers with trusted, up-to-date trail information, support a network of fellow adventurers, and bring together resources that elevate each step of the way. Whether you're planning a short day hike or an extended backcountry trek, TrailMates is here to help you reach new heights.</p>
      </div>
    </div>
  );
};

export default About;
