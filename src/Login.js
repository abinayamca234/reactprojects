import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            if (response.data.success) {
                // Redirect to Employees page
                navigate('/employees');
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <div className="card">
                <div className="header-container">
                    <h3>Admin Register</h3>
                </div>

                <div className="input-container">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="forgot-password">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;
