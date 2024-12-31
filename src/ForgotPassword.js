import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    // const handleSubmit = () => {
    //     // Perform any required logic (e.g., API calls)
    //     // On success, navigate to the OTP page
    //     navigate('/otp');
    // };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/forgot-password', { email });

            if (response.data.success) {
                alert('Password reset email sent!');
                navigate('/otp'); // Navigate to the OTP page
            } else {
                alert('Error sending reset email. Please try again.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="card">
                <div className="header-container"><h3>Forgot Password</h3></div>
                <div className="input-container">
                    <label htmlFor="email">Enter your email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button onClick={handleSubmit}>Send Reset Link</button>
            </div>
        </div>
    );
}

export default ForgotPassword;
