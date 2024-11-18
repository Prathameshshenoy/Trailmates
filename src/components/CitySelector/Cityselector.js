import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './CitySelector.css';

const CitySelector = ({ cities, onSelectCity, onClose }) => {
  const handleCitySelect = (city) => {
    console.log('City selected:', city); 
    onSelectCity(city);
  };

  return (
    <div className="city-selector-overlay">
      <div className="city-selector">
        <div className="city-selector-header">
          <h2>Select Your City</h2>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>
        <ul className="city-list">
          {cities.map((city, index) => (
            <li key={index} className="city-item" onClick={() => handleCitySelect(city)}>
              {city}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CitySelector;
