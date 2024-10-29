import React, { useEffect, useState } from "react";
import ImageViewer from "./ImageViewer";
import Avatar from '@mui/material/Avatar';
import { Box, Typography, Button } from '@mui/material';
import axios from "axios"; 
const images = [
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  // Add more URLs as needed
];

function Dashboard() {
  const [isLoading] = useState(false); // Remove setIsLoading if not using it
  const [user, setUser] = useState(null);
  const [userLatitude, setUserLatitude] = useState(null); // State for latitude
  const [userLongitude, setUserLongitude] = useState(null); // State for longitude
  const handleLogout = () => {
    window.location.href = "http://localhost:8080/auth/logout"; // Directly go to logout URL
  };

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
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userEmail = user.email;

          setUserLatitude(latitude); // Set userLatitude state
          setUserLongitude(longitude); // Set userLongitude state

          setUserLatitude(latitude); // Set userLatitude state
          setUserLongitude(longitude); // Set userLongitude state

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
  }, [user]);


  useEffect(() => {
    if (userLatitude && userLongitude) {
      // Check for latitude and longitude state
      fetch("http://localhost:8080/nearby/fetch-locations-in-radius", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude: userLatitude,
          longitude: userLongitude,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Filtered groups:", data);
        })
        .catch((error) => {
          console.error("Error fetching locations:", error);
        });
    }
  }, [userLatitude, userLongitude]); // Trigger this effect when latitude and longitude are set

  if (!user) return <div>Loading...</div>;

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {/* Profile Picture */}
        <Avatar
          alt={user.username}
          src={user.profilePicture || 'https://via.placeholder.com/150'} // Placeholder if no profile picture
          sx={{ width: 80, height: 80, marginRight: 2 }}
        />
        <Box>
          <Typography variant="h6">{user.username}</Typography>
          <Typography variant="body2" color="textSecondary">{user.email}</Typography>
          <Typography variant="body2" color="textSecondary">{user.phone}</Typography>
          <Typography variant="body2" color="textSecondary">{user.bio}</Typography>
          <Typography variant="body2" color="textSecondary">{user.dob}</Typography>
          <Button
            onClick={handleLogout}
            disabled={isLoading}
            variant="contained"
            color="error"
            sx={{ marginTop: 1 }}
          >
            {isLoading ? "Logging out..." : "Logout"}
          </Button>
        </Box>
      </Box>

      {/* Image Viewer */}
      <ImageViewer images={images} />
    </Box>
  );
}

export default Dashboard;
