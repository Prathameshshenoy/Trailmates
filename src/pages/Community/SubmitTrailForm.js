import React, { useState } from 'react';
import axios from 'axios';
import './SubmitTrailForm.css';

const SubmitTrailForm = () => {
  const [data, setData] = useState({
    name: '',
    location: '',
    city: '',
    difficulty: '',
    length: '',
    elevation: '',
    reviews: [],
  });

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setError('');
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    files.forEach((file) => {
      formData.append('image', file);
    });

    try {
      await axios.post('http://localhost:8000/api/submit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Trail submitted successfully!');
      setData({ name: '', location: '', city: '', difficulty: '', length: '', elevation: '', reviews: [] });
      setFiles([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting trail.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='background'>
    <div className="form-container">
      <h1>Submit a Trail</h1>
      {success && <div className="success">{success}</div>}
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Trail Name:</label>
          <input type="text" name="name" value={data.name} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Location:</label>
          <input type="text" name="location" value={data.location} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>City:</label>
          <input type="text" name="city" value={data.city} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Difficulty:</label>
          <input type="text" name="difficulty" value={data.difficulty} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Length:</label>
          <input type="text" name="length" value={data.length} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Elevation:</label>
          <input type="text" name="elevation" value={data.elevation} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Images:</label>
          <input type="file" onChange={handleImageChange} multiple accept="image/*" />
        </div>

        <div className="input-group">
          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default SubmitTrailForm;
