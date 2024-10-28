import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignupWithGoogle() {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    phone: "",
    dob: "",
  });
  const navigate = useNavigate();

  // Redirects to Google OAuth
  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:8080/auth/google?flow=signup";
  };

  // Fetch user data after successful Google auth
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("http://localhost:8080/auth/signup/user-data", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error("Failed to fetch user data");
      }
    };

    // Call the fetchUserData function only if userData is null
    if (!userData) {
      fetchUserData();
    }
  }, [userData]); // Dependencies array includes userData

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth/complete-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ...formData, email: userData.email }),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Check user type and redirect accordingly
        if (result.type === 'admin') {
          navigate("http://localhost:3000/admin"); // Redirect to admin page
        } else {
          navigate("http://localhost:3000/dashboard"); // Redirect to user dashboard
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to complete signup");
      }
    } catch (error) {
      console.error("Signup error:", error);
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
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

  // Initial signup screen (if no userData)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign up with your Google account to get started
        </p>
        <button
          onClick={handleGoogleSignup}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
              />
            </svg>
          </span>
          Sign up with Google
        </button>
      </div>
    </div>
  );
}

export default SignupWithGoogle;
