//userprofile.js
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [isLoading] = useState(false); // Remove setIsLoading if not using it

  const handleLogout = () => {
    window.location.href = "http://localhost:8080/auth/logout"; // Directly go to logout URL
  };
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("http://localhost:8080/auth/current_user", {
        credentials: "include",
      });
      const userData = await response.json();
      setUser(userData);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user && navigator.geolocation) {
      // Add a check to ensure user is not null
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userEmail = user.email;

          // Send latitude and longitude to the backend along with email
          fetch("http://localhost:8080/user/update-location", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: userEmail, latitude, longitude }),
          })
            .then((res) => res.json())
            .then((response) => {
              console.log("Location saved successfully:", response);
            })
            .catch((error) => {
              console.error("Error sending location data:", error);
            });

          // Reverse geocoding API
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
          fetch(url)
            .then((res) => res.json())
            .then((data) => {
              console.table(data.address);
              console.log("Latitude:", latitude);
              console.log("Longitude:", longitude);
            })
            .catch((error) => {
              console.log("Error fetching data from API", error);
            });
        },
        (error) => {
          console.error("Error getting location:", error.message);
          alert("Failed to retrieve location: " + error.message);
        }
      );
    } else if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
    }
  }, [user]); // Run effect only after user is set
  if (!user) return <div>Loading...</div>;
  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Bio: {user.bio}</p>
      <p>Phone: {user.phone}</p>
      <p>Date of Birth: {user.dob}</p>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          VadavoomvoomvadavoomvoomvadavoomDashboard
        </h2>
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className={`${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          } text-white px-6 py-2 rounded-md transition-colors duration-200 flex items-center`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Logging out...
            </>
          ) : (
            "Logout"
          )}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
