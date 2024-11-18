import React, { useState, useEffect } from 'react';

import TrailCard from '../../components/TrailCard/TrailCard';
import Button from '../../components/Button/button';
import CitySelector from '../../components/CitySelector/Cityselector';

import './Home.css';
import { locationMapping } from '../../data/location_mapping';

const Home = () => {
  const [showAll, setShowAll] = useState(false);
  const [location, setLocation] = useState('');
  const [trails, setTrails] = useState([]);
  const [cityModal, setCityModal] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrails = async (city) => {
    console.log('fetching for',{city})
    if (!city) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:8000/api/trails?city=${encodeURIComponent(city)}`);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      const approvedTrails = data.filter(trail => trail.approved === true);
      setTrails(approvedTrails);
    } catch (error) {
      console.error('Error fetching trails:', error);
      setError('Failed to fetch trails. Please try again later.');
      setTrails([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
      setLocation(savedCity);
      fetchTrails(savedCity);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
              const city = data.city || data.locality || data.principalSubdivision || "Your Location";
              setLocation(city);
              fetchTrails(city);
            });
        }, () => {
          setCityModal(true);
        });
      } else {
        setCityModal(true);
      }
    }
  }, []); 

  const handleCityChange = (city) => {
    localStorage.setItem('selectedCity', city);
    setCityModal(false);
    setLocation(city); 
    fetchTrails(city); 

  };

  const displayedTrails = trails
    .filter(trail => trail.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, showAll ? undefined : 4);

  return (
    <div className="home-container">
      <div className="main-banner" style={{ backgroundImage: `url(http://localhost:8000/images/search2.jpg)` }}>
        <div className="banner-content">
          <h1>Find Your Next Adventure</h1>
          <p>Explore new trails and join our community of hikers</p>
          
          <div className="search-box">
            <input
              type="text"
              placeholder="Search for trails..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="trail-list">
        <h2>Trails in {location}</h2>
        {error && <p className="error-msg">{error}</p>}
        
        {isLoading ? (
          <p>Loading trails...</p>
        ) : (
          <div className="trail-grid">
            {displayedTrails.length > 0 ? (
              displayedTrails.map(trail => (
                <TrailCard key={trail._id} trail={trail} />
              ))
            ) : (
              <p>No trails found in your area.</p>
            )}
          </div>
        )}
        
        {trails.length > 4 && (
          <div className="load-more">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="load-more-button"
            >
              {showAll ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        )}
      </div>

      {cityModal && (
        <div className="modal-overlay">
          <CitySelector
            cities={Object.keys(locationMapping)}
            onSelectCity={handleCityChange}
            onClose={() => setCityModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
