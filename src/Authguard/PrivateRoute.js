import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ element: Component, roles, ...rest }) => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user && !token) {
        setLoading(false);
        return; // No user or token, skip fetching
      }

      try {
        const response = await fetch(
          "https://backend-location-social-media.onrender.com/auth/current_user",
          {
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
          }
        );

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, token]);

  if (loading) {
    return <div>Loading...</div>; // You can display a loading indicator here
  }

  if (error || !userData) {
    return <Navigate to="/" />; // If there's an error or no user data, redirect
  }

  if (roles && !roles.includes(userData?.type)) {
    return <Navigate to="/" />; // Check user role and redirect if unauthorized
  }

  return <Component {...rest} />; // Render the component if authorized
};

export default PrivateRoute;
