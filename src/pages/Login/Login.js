import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setLoggedIn }) => {  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
  
    const url = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const requestData = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;
  
    try {
      const response = await fetch(`http://localhost:8000${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (isLogin) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('name', data.user.name);
          localStorage.setItem('userId', data.user._id);
          
          setLoggedIn(true); 
          setSuccessMessage('Login successful!');
          navigate('/');
        } else {
          setSuccessMessage('Account created successfully! Please log in.');
          setIsLogin(true);
        }
      } else {
        setError(data.message || 'An error occurred. Please try again.');
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-page">
      <div className="login-container">
        <div className="auth-header">
          <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="auth-subtitle">
            {isLogin
              ? 'Enter your credentials to access your account'
              : 'Fill in the information to create your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="alert error">{error}</div>}
          {successMessage && <div className="alert success">{successMessage}</div>}

          <button type="submit" className="submit-button">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="toggle-auth"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;