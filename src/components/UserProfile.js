// Dashboard.js
import React, { useEffect, useState } from "react";
import ImageViewer from "./ImageViewer";
import EditProfile from "./EditProfile";
import Avatar from "@mui/material/Avatar";
import {
  Box,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { fetchCurrentUser } from "../services/UserService";

const images = [
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
];

function Dashboard() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchCurrentUser();
        console.log("Fetched user data:", userData);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    window.location.href = "http://localhost:8080/auth/logout";
  };

  const handleEditToggle = () => setIsEditing((prev) => !prev);

  const handleSave = (updatedData) => {
    setUser(updatedData);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="85vh"
      >
        <CircularProgress /> {/* Loading spinner */}
      </Box>
    );
  }

  if (!user) {
    return <div>No user data found.</div>; // Handle case where user is not found
  }

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="85vh"
      >
        <CircularProgress /> {/* Loading spinner */}
      </Box>
    );
  }

  if (!user) {
    return <div>No user data found.</div>; // Handle case where user is not found
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        p: 4,
        height: "85vh",
      }}
    >
      {/* Left Section: User Profile */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: { xs: "100%", md: "20%" },
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
        }}
      >
        <Avatar
          alt={user.username}
          src={user.profilePic}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Typography variant="h6" color="textPrimary">
          {user.username}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {user.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          {user.email}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          {user.phone}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          {user.bio}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          {user.dob ? new Date(user.dob).toLocaleDateString("en-GB") : "N/A"}
        </Typography>
        <Button
          onClick={handleEditToggle}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Edit Profile
        </Button>
        <Button
          onClick={handleLogout}
          disabled={isLoading}
          variant="contained"
          color="error"
          fullWidth
          sx={{ mt: 2 }}
        >
          {isLoading ? "Logging out..." : "Logout"}
        </Button>
      </Box>

      {/* Right Section: Image Viewer */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" color="textPrimary" sx={{ mb: 2 }}>
          Posts
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <ImageViewer images={images} />
      </Box>

      {/* Edit Profile Modal */}
      <EditProfile
        open={isEditing}
        user={user}
        onClose={handleEditToggle}
        onSave={handleSave}
      />
    </Box>
  );
}

export default Dashboard;
