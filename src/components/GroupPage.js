import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import {
  Box,
  Typography,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";
import { fetchGroupDetails } from "../services/groupService";
import { getAllPostsByGroupId } from "../services/postService";
import PostViewer from "./PostViewer";

function GroupPage() {
  const { groupId } = useParams(); // Use useParams to get groupId from the URL
  console.log("Group ID from URL:", groupId);
  const [isLoading, setIsLoading] = useState(true);
  const [group, setGroup] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const groupData = await fetchGroupDetails({ groupId });
        setGroup(groupData);

        const groupPosts = await getAllPostsByGroupId({ groupId });
        setPosts(groupPosts);
      } catch (error) {
        console.error("Error fetching group data or posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (groupId) {
      fetchGroupData();
    }
  }, [groupId]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="85vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!group) {
    return <div>No group data found.</div>;
  }

  const {
    name,
    description,
    category,
    city,
    coordinates,
    createdAt,
    distance,
  } = group;

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
      {/* Left Section: Group Profile */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          width: { xs: "100%", sm: "80%", md: "25%", lg: "20%" }, // Match the width from Dashboard
        }}
      >
        <Typography variant="h6" color="textPrimary">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          <strong>Category:</strong> {category}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          <strong>City:</strong> {city}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          <strong>Distance:</strong> {distance} meters
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          <strong>Description:</strong>{" "}
          {description || "No description available"}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          <strong>Created At:</strong>{" "}
          {new Date(createdAt).toLocaleDateString()}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href={`https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`}
          target="_blank"
          sx={{ mt: 2 }}
        >
          View on Google Maps
        </Button>
      </Box>
      {/* Right Section: Group Posts */}
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
    </Box>
  );
}

export default GroupPage;
