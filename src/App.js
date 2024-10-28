
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CompleteSignup from './components/CompleteSignup';
import SignupWithGoogle from './components/SignupWithGoogle';
import UserProfile from './components/UserProfile';

function App() {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<SignupWithGoogle />} />
            <Route path="/auth/complete-profile" element={<CompleteSignup />} />
                <Route path="/complete-signup" element={<Login />} />
                <Route path="/profile" element={<CompleteSignup />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;