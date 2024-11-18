import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './TrailDetails.css';

const TrailDetails = () => {
  const { id } = useParams();
  const [trail, setTrail] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const getTrail = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/trails/${id}`);
        if (!res.ok) throw new Error('Error fetching trail');
        const data = await res.json();
        setTrail(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getTrail();
  }, [id]);

  const prevImg = () => {
    if (trail) setCurrentImg((prev) => (prev === 0 ? trail.images.length - 1 : prev - 1));
  };

  const nextImg = () => {
    if (trail) setCurrentImg((prev) => (prev === trail.images.length - 1 ? 0 : prev + 1));
  };

  const addReview = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Log in to add review.");
    } else {
      setShowReview(true);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Log in to submit review.");
      return;
    }

    const newReview = {
      user: localStorage.getItem('name'),
      comment: reviewText,
      rating,
    };

    try {
      const res = await fetch(`http://localhost:8000/api/trails/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newReview),
      });

      if (!res.ok) throw new Error('Review submission failed');
      const updatedTrail = await res.json();
      setTrail(updatedTrail);
      setShowReview(false);
      setReviewText('');
      setRating(5);
    } catch (err) {
      alert('Error submitting review.');
    }
  };

  const deleteReview = async (reviewId) => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('name');  
    if (!token) {
      alert("Log in to delete review.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/trails/${id}/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'X-User-Name': userName
        },
      });

      if (!res.ok) throw new Error('Review deletion failed');
      const updatedTrail = await res.json();
      setTrail(updatedTrail);
    } catch (err) {
      alert('Error deleting review.');
    }
};


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!trail) return <p className="not-found">Trail not found</p>;

  return (
    <div className="trail-detail">
      <h1 className="title">{trail.name}</h1>

      <div className="carousel">
        <button className="arrow left" onClick={prevImg}>&lt;</button>
        <img
          src={`http://localhost:8000${trail.images[currentImg]}`}
          alt={`${trail.name} ${currentImg + 1}`}
          className="carousel-img"
        />
        <button className="arrow right" onClick={nextImg}>&gt;</button>
      </div>

      <div className="info">
        <p><strong>Location:</strong> {trail.location}</p>
        <p><strong>Difficulty:</strong> {trail.difficulty}</p>
        <p><strong>Length:</strong> {trail.length}</p>
        <p><strong>Elevation:</strong> {trail.elevation}</p>
      </div>

      <section className="reviews">
        <h2>Reviews</h2>
        {trail.reviews && trail.reviews.length > 0 ? (
          trail.reviews.map((review) => (
            <div key={review._id} className="review">
              <p><strong>{review.user}</strong>: {review.comment}</p>
              <p>Rating: {review.rating} / 5</p>
              {review.user === localStorage.getItem('name') && (
                <button onClick={() => deleteReview(review._id)} className="delete-btn">
                  Delete Review
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </section>

      <button onClick={addReview} className="add-btn">
        Add Review
      </button>

      {showReview && (
        <div className="review-form">
          <h3>Write Review</h3>
          <form onSubmit={submitReview}>
            <label>
              Rating:
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              />
            </label>
            <label>
              Review:
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TrailDetails;
