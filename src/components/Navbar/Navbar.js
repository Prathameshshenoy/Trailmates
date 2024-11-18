import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { locationMapping } from '../../data/location_mapping';
import CitySelector from '../../components/CitySelector/Cityselector';

const Navbar = ({ loggedIn, setLoggedIn }) => {
  const [dropdown, setDropdown] = useState(false);
  const [cityModal, setCityModal] = useState(false);
  const [savedCity, setSavedCity] = useState(localStorage.getItem('selectedCity') || '');
  const dropdownRef = useRef(null);

  const username = localStorage.getItem('name');
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('selectedCity');
    setLoggedIn(false);
    setDropdown(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdown((prev) => !prev);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdown(false);
    }
  };

  const handleCityChange = (city) => {
    localStorage.setItem('selectedCity', city);
    setSavedCity(city);
    setCityModal(false);
  };

  useEffect(() => {
    const initialCity = localStorage.getItem('selectedCity');
    if (initialCity && savedCity !== initialCity) {
      setSavedCity(initialCity);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="left-section">
          <Link to="/" className="logo">
            <i className="fas fa-mountain"></i> TrailMates
          </Link>
          {savedCity && (
            <div className="selected-city" onClick={() => setCityModal(true)}>
              {savedCity} <span className="change-city">(Change)</span>
            </div>
          )}
        </div>

        <div className="links">
          <Link to="/about" className="link">About Us</Link>
          <Link to="/community" className="link">Community</Link>
          <Link to="/products" className="link">Shop</Link>
          <Link to="/cart" className="link">Cart</Link>
          {loggedIn ? (
            <div className="profile" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="profile-btn">
                <img
                  src="https://w7.pngwing.com/pngs/525/520/png-transparent-avatar-boy-people-person-profile-tom-user-user-avatar-icon.png"
                  alt="Profile"
                  className="profile-pic"
                />
              </button>
              {dropdown && (
                <div className="dropdown">
                  <div className="header">
                    <p className="name">{username || 'User'}</p>
                  </div>
                  <button onClick={logout} className="item logout">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </div>
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
    </nav>
  );
};

export default Navbar;
