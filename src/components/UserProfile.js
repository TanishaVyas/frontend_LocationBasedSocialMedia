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
import {getAllPostsByUserId} from "../services/postService";
import PostViewer from "./PostViewer";

function Dashboard() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [images, setImages] = useState([]); // Store images here
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]); // Store posts here


   useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchCurrentUser();
        setUser(userData);
        
        // Use userData._id directly
        if (userData._id) {
          const userPosts = await getAllPostsByUserId({ userId: userData._id });
          console.log("hi");
          setPosts(userPosts); 
        }
      } catch (error) {
        console.error("Error fetching user data or posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    window.location.href = "https://backend-location-social-media.onrender.com/auth/logout";
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
      {/*User Profile */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "100%", sm: "80%", md: "25%", lg: "20%" },
          bgcolor: "background.default",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: { xs: "100%", sm: "80%", md: "25%", lg: "20%" },
            bgcolor: "background.paper",
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            justifyContent: "center",
          }}
        >
          <Avatar
            alt={user.username}
            src={user.profilePic}
            sx={{
              width: { xs: 80, sm: 100 },
              height: { xs: 80, sm: 100 },
              mb: 2,
            }}
          />
          <Typography variant="h6" color="textPrimary" textAlign="center">
            {user.username}
          </Typography>
          <Typography variant="body2" color="textSecondary" textAlign="center">
            {user.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mb: 1 }}
            textAlign="center"
          >
            {user.email}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mb: 1 }}
            textAlign="center"
          >
            {user.phone}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mb: 1 }}
            textAlign="center"
          >
            {user.bio}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mb: 2 }}
            textAlign="center"
          >
            {user.dob ? new Date(user.dob).toLocaleDateString("en-GB") : "N/A"}
          </Typography>
          <Button
            onClick={handleEditToggle}
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              width: { xs: "100%", sm: "100%", md: "300%", lg: "400%" },
            }}
          >
            Edit Profile
          </Button>
          <Button
            onClick={handleLogout}
            disabled={isLoading}
            variant="contained"
            color="error"
            sx={{
              mt: 2,
              width: { xs: "100%", sm: "100%", md: "300%", lg: "400%" },
            }}
          >
            {isLoading ? "Logging out..." : "Logout"}
          </Button>
        </Box>
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
        <PostViewer posts={posts} />
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
