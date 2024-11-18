import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TrailCard.css';

const TrailCard = ({ trail }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/trails/${trail._id}`); // Navigate to trail detail page
  };

  return (
    <div className="card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="image-container">
        <img src={`http://localhost:8000${trail.images[0]}`} alt={trail.name} />
        <div className="difficulty">{trail.difficulty}</div>
      </div>
      <div className="card-content">
        <h3>{trail.name}</h3>
        <div className="info">
          <p className="location">📍 {trail.location}</p>
          <p className="length">⚡ {trail.length}</p>
          <p className="elevation">🏔 {trail.elevation}</p>
        </div>
      </div>
    </div>
  );
};

export default TrailCard;
