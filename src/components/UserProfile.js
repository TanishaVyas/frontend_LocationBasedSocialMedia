import React, { useEffect, useState } from "react";
import ImageViewer from "./ImageViewer";
import EditProfile from "./EditProfile";
import Avatar from "@mui/material/Avatar";
import { Box, Typography, Button, Divider, Modal } from "@mui/material";

const images = [
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
];

function Dashboard() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    window.location.href = "http://localhost:8080/auth/logout";
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

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = (updatedData) => {
    setUser(updatedData);
    setIsEditing(false);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        p: 4,
        height:"85vh"

          
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
          {user.dob}
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
          Image Gallery
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
