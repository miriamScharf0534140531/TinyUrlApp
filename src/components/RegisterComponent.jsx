import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { register } from '../services/api.jsx';
import './RegisterComponent.css';

const RegisterComponent = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const data = await register(name,email, password);
            console.log("data", data);
            const { userId } = data;
            if (userId) {
              console.log("user id:", userId);
              navigate('/dashboard', { state: { userId } });
            }
        } catch (error) {
            console.error('Error while register:', error);
        }
    };
    return (
        <div className="register-container">
        <h2>Register</h2>
        <form className="register-form">
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="register-input"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="register-input"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="register-input"
            />
            <button type="button" onClick={handleRegister} className="register-button">Register</button>
        </form>
    </div>
    );
};

export default RegisterComponent;
