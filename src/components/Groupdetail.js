import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";

function Group() {
  const { id } = useParams(); // Get the group ID from the URL
  const [groupData, setGroupData] = useState(null); // State to store group data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/groups/${id}`);
        if (!response.ok) {
          throw new Error("Group not found");
        }
        const data = await response.json();
        setGroupData(data); // Update state with the fetched group data
      } catch (err) {
        setError(err.message); // Handle error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchGroupData();
  }, [id]); // Fetch data when component mounts or ID changes

  if (loading) {
    return <CircularProgress />; // Show loading spinner
  }

  if (error) {
    return <Typography color="error">{error}</Typography>; // Display error message
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Group ID: {id}</Typography>
      <Typography variant="h6">Name: {groupData.name}</Typography>
      <Typography variant="body1">City: {groupData.city}</Typography>
      <Typography variant="body1">Category: {groupData.category}</Typography>
      <Typography variant="body1">Description: {groupData.description || "No description available"}</Typography>
      <Typography variant="body1">Coordinates: {`Longitude: ${groupData.coordinates.longitude}, Latitude: ${groupData.coordinates.latitude}`}</Typography>
      <Button variant="contained" onClick={() => window.history.back()}>
        Go Back
      </Button>
    </Box>
  );
}

export default Group;
