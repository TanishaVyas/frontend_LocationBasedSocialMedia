// CompleteSignup.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CompleteSignup() {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    // Fetch user data after successful Google auth
    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch('http://localhost:8080/auth/signup/user-data', {
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else {
                console.error('Failed to fetch user data');
            }
        };

        fetchUserData();
    }, []); // Only run once on component mount

    const [formData, setFormData] = useState({
        username: '',
        bio: '',
        phone: '',
        dob: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/complete-signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate('/auth/complete-profile');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to complete signup');
            }
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    // If we have user data but need additional details
    if (userData) {
        return (
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Complete Your Profile</h2>
                
                {/* Display Google Account Info */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                        {userData.profilePic && (
                            <img 
                                src={userData.profilePic} 
                                alt="Profile" 
                                className="w-16 h-16 rounded-full"
                            />
                        )}
                        <div>
                            <p className="font-semibold">{userData.name}</p>
                            <p className="text-gray-600">{userData.email}</p>
                        </div>
                    </div>
                </div>

                {/* Additional Details Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Choose a username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                            name="bio"
                            placeholder="Tell us about yourself"
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            rows="4"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Complete Signup
                    </button>
                </form>
            </div>
        );
    }

    // Loading state
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-gray-600">Loading...</p>
        </div>
    );
}

export default CompleteSignup;
