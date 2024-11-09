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

const mainCategories = {
  amenity: [
    "atm",
    "bank",
    "bar",
    "bicycle_parking",
    "bureau_de_change",
    "cafe",
    "clinic",
    "dentist",
    "doctors",
    "fast_food",
    "fire_station",
    "library",
    "nursing_home",
    "pharmacy",
    "post_office",
    "restaurant",
    "school",
    "university",
  ],
  leisure: [
    "park",
    "playground",
    "stadium",
    "swimming_pool",
    "gym",
    "sports_centre",
    "pitch",
    "skatepark",
    "miniature_golf",
    "marina",
    "beach_resort",
    "public_building",
  ],
  health: [
    "hospital",
    "clinic",
    "dentist",
    "doctors",
    "veterinary",
    "nursing_home",
    "pharmacy",
  ],
  tourism: [
    "museum",
    "art_gallery",
    "zoo",
    "viewpoint",
    "theme_park",
    "camp_site",
    "tourist_information",
    "hotel",
    "hostel",
    "motel",
    "guest_house",
    "chalet",
    "bed_and_breakfast",
  ],
  shop: [
    "supermarket",
    "department_store",
    "mall",
    "clothes",
    "electronics",
    "furniture",
    "books",
    "toys",
    "hardware",
    "beauty",
    "jewelry",
    "gift",
  ],
  transport: [
    "bus_station",
    "train_station",
    "subway_station",
    "taxi",
    "ferry_terminal",
    "airport",
    "car_sharing",
    "bicycle_rental",
    "charging_station",
  ],
  place: [
    "city",
    "town",
    "village",
    "locality",
    "suburb",
    "island",
    "continent",
  ],
  public_transport: [
    "bus_stop",
    "train_stop",
    "subway_station",
    "tram_stop",
    "ferry_stop",
  ],
  religion: [
    "church",
    "mosque",
    "synagogue",
    "temple",
    "buddhist_temple",
    "hindu_temple",
    "shrine",
  ],
  building: [
    "yes",
    "commercial",
    "residential",
    "industrial",
    "warehouse",
    "school",
    "church",
    "museum",
  ],
};

const LocationForm = () => {
  const [city, setCity] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [category, setCategory] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleMainCategoryChange = (event) => {
    setMainCategory(event.target.value);
    setCategory(""); // Reset category when main category changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city || !mainCategory || !category) {
      setSnackbarMessage("Please select all fields.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }
    console.log(city, category, mainCategory);

    try {
      const response = await axios.post(
        "http://localhost:8080/location/fetch-locations",
        {
          city,
          category,
          mainCategory,
        }
      );
      console.log("Locations fetched:", response.data);
      setSnackbarMessage("Locations fetched successfully!");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Error fetching locations:", error);
      setSnackbarMessage("Error fetching locations. Please try again.");
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

      {/* City Field */}
      <TextField
        label="City Name"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        sx={{ mb: 2, width: "100%" }}
      />

      {/* Main Category Dropdown */}
      <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Main Category</InputLabel>
        <Select
          value={mainCategory}
          onChange={handleMainCategoryChange}
          label="Main Category"
        >
          <MenuItem value="">
            <em>Select Main Category</em>
          </MenuItem>
          {Object.keys(mainCategories).map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Category Dropdown */}
      <FormControl
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        disabled={!mainCategory}
      >
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
        >
          <MenuItem value="">
            <em>Select Category</em>
          </MenuItem>
          {mainCategory &&
            mainCategories[mainCategory].map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {/* Submit Button */}
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
