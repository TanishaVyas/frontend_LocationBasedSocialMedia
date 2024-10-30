import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  fetchCurrentUser,
  fetchNearbyGroups,
  joinGroup,
} from "../services/UserService";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    window.location.href = "http://localhost:8080/auth/logout";
  };

  const handleCreatePost = () => {
    navigate("/create-post"); // Navigate to the CreatePosts page
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await fetchCurrentUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLatitude(latitude);
        setUserLongitude(longitude);

        const nearbyGroups = await fetchNearbyGroups(latitude, longitude);
        setGroups(nearbyGroups);
      });
    }
  }, [user]);

  const handleJoinGroup = async (groupId) => {
    try {
      const response = await joinGroup(user._id, groupId);
      console.log("Group joined successfully:", response);
    } catch (error) {
      console.error("Error joining group:", error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar
          alt={user.username}
          src={user.profilePic || "https://via.placeholder.com/150"}
          sx={{ width: 80, height: 80, marginRight: 2 }}
        />
        <Box>
          <Typography variant="h6">{user.username}</Typography>
          <Typography variant="body2" color="textSecondary">
            {user.email}
          </Typography>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="error"
            sx={{ marginTop: 1 }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <Typography variant="h5" sx={{ mt: 2 }}>
        Nearby Groups
      </Typography>
      <List>
        {groups.map((group) => (
          <ListItem key={group._id} sx={{ justifyContent: "space-between" }}>
            <ListItemText
              primary={
                <Button
                  onClick={(e) => {
                    e.preventDefault(); // Prevent any default action
                    navigate(`/group/${group._id}`); // Navigate to the '/group/:id' page
                  }}
                  sx={{ textAlign: "left", justifyContent: "flex-start" }}
                >
                  {group.name}
                </Button>
              }
              secondary={`Distance: ${
                group.distance ? group.distance.toFixed(2) : "N/A"
              } km`}
            />
            <Button
              variant="contained"
              onClick={() => handleJoinGroup(group._id)}
              color="primary"
            >
              Join Group
            </Button>
            <Button
              variant="contained"
              onClick={() => handleCreatePost}
              color="primary"
            >
              create post
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Dashboard;
