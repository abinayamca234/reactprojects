import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OTPPage() {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const handleVerify = () => {
        // Perform OTP verification logic here
        // On success, navigate to the "New Password" page
        if (otp === '123456') { // Example OTP check
            navigate('/new-password');
        } else {
            alert('Invalid OTP. Please try again.');
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="card">
                <div className="header-container"><h3>Verify OTP</h3></div>
                <div className="input-container">
                    <label htmlFor="otp">Enter OTP</label>
                    <input
                        id="otp"
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </div>
                <button onClick={handleVerify}>Verify</button>
            </div>
        </div>
    );
}

export default OTPPage;
