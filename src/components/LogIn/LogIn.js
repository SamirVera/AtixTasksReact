import React, { useState } from 'react';
import '../../styles/Form.css';
import axios from 'axios';

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        console.log(event);
        event.preventDefault();

        const loginData = {
            email: email,
            password: password
        };
        console.log(loginData);

        try {
            const response = await axios.post('http://localhost:3005/api/login', loginData);
            console.log('Login Successful:', response.data);

            const token = response.data.token;

            localStorage.setItem('token', token);

            console.log('Login Successful:', response.data);
            window.location.href = '/tasks';
        } catch (error) {
            console.error('Login Error:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <div className="form-container">
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-label">
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-label">
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="form-input"
                    />
                </div>
                <button type="submit" className="form-button">Login</button>
            </form>
        </div>
    );
}

export default LogIn;
