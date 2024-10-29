import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

const LocationForm = () => {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city || !category) {
      setSnackbarMessage("Please enter a city and select a category");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/location/fetch-locations",
        {
          city,
          category,
        }
      );
      console.log("Locations saved:", response.data);
      setSnackbarMessage("Locations fetched successfully!");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Error saving locations:", error);
      setSnackbarMessage("Error saving locations. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 2,
        width: { xs: "100%", sm: "400px" },
        mx: "auto",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Add Groups
      </Typography>
      <TextField
        label="City Name"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        sx={{ mb: 2, width: "100%" }}
      />
      <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Select Category"
        >
          <MenuItem value="">
            <em>Select category</em>
          </MenuItem>
          <MenuItem value="college|university">University/College</MenuItem>
          <MenuItem value="hospital">Hospital</MenuItem>
          <MenuItem value="restaurant|cafe">Restaurant/Cafe</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Submit
      </Button>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LocationForm;
