import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';

import { login } from '../services/api.jsx';
import './LoginComponent.css';
const LoginComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      setErrorMessage('');
      const data = await login(email, password);
      console.log("dataa", data);
      const { userId } = data;
      if (userId) {
        console.log("user id:", userId);
        navigate('/dashboard', { state: { userId } });
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Error while logging in:', error);
    }
  };

  return (
    <>
        <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit"  className="login-button">Login</button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="register-link">
        <Link to="/register">Don't have an account? Register</Link>
      </div>
    </div>
    </>
  );
};

export default LoginComponent;
