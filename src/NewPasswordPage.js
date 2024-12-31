import React from 'react';
import { useNavigate } from 'react-router-dom';

function NewPasswordPage() {
    const navigate = useNavigate();

    const handleResetPassword = () => {
        // You can add logic for password reset here
        navigate('/reset-password'); // Navigate to the Reset Password page
    };

    return (
        <div className="forgot-password-container">
            <div className="card">
                <div className="header-container"><h3>Set New Password</h3></div>
                <div className="input-container">
                    <label htmlFor="password">New Password</label>
                    <input id="password" type="password" placeholder="Enter new password" />
                </div>
                <div className="input-container">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input id="confirm-password" type="password" placeholder="Confirm new password" />
                </div>
                <button onClick={handleResetPassword}>Reset Password</button>
            </div>
        </div>
    );
}

export default NewPasswordPage;
