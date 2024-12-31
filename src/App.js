import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import OTPPage from './OTPPage';
import NewPasswordPage from './NewPasswordPage';
import ResetPasswordPage from './ResetPasswordPage';
import Employees from './Employees'; // Example of another page

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/otp" element={<OTPPage />} />
                <Route path="/new-password" element={<NewPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/employees" element={<Employees />} />
            </Routes>
        </Router>
    );
}

export default App;
