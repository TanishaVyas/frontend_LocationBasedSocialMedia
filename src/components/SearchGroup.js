import React, { useState, useEffect } from "react";
import GroupCard from "./GroupCard";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { fetchNearbyGroups, fetchAllCategories } from "../services/groupService";
import { useLocation } from "react-router-dom";
const SearchGroup = ({ navigateTo }) => {

  const location = useLocation();
  const { category } = location.state || {}; // Receive the category from the state

  const [user, setUser] = useState(null);
  const [allGroups, setAllGroups] = useState([]);
  const [groups, setGroups] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [distanceFilter, setDistanceFilter] = useState(1);
  const [message, setMessage] = useState("Nearby groups");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAllCategories()
      .then((fetchedCategories) => {
        setCategories(fetchedCategories);
      })
      .catch((error) => console.error("Error fetching categories:", error));

    fetchNearbyGroups(setUser)
      .then((nearbyGroups) => {
        setAllGroups(nearbyGroups);
        setGroups(nearbyGroups);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    filterGroups(event.target.value, selectedCategory, distanceFilter);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    filterGroups(searchInput, category, distanceFilter);
  };

  const handleDistanceChange = (event, newValue) => {
    setDistanceFilter(newValue);
    filterGroups(searchInput, selectedCategory, newValue);
  };

  const filterGroups = (name, category, maxDistance) => {
    let filteredGroups = allGroups;

    if (name) {
      filteredGroups = filteredGroups.filter((group) =>
        group.name.toLowerCase().includes(name.toLowerCase())
      );
      setMessage(`Searching for groups with "${name}"`);
    } else {
      setMessage("Nearby groups");
    }

    if (category) {
      filteredGroups = filteredGroups.filter(
        (group) => group.category.toLowerCase() === category.toLowerCase()
      );
      setMessage(`Filtering groups in category "${category}"`);
    }

    filteredGroups = filteredGroups.filter(
      (group) => group.distance <= maxDistance
    );

    setGroups(filteredGroups);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={2} justifyContent="center" direction="column">
        {/* Search Bar */}
        <Grid item xs={12}>
          <TextField
            label="Search Groups"
            variant="outlined"
            value={searchInput}
            onChange={handleSearchChange}
            fullWidth
          />
        </Grid>

        {/* Category Filter */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Filter by Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Filter by Category"
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Distance Slider */}
        <Grid item xs={12}>
          <Typography gutterBottom>Filter by Distance (km)</Typography>
          <Slider
            value={distanceFilter}
            onChange={handleDistanceChange}
            aria-labelledby="distance-slider"
            min={1}
            max={10}
            valueLabelDisplay="auto"
          />
        </Grid>
      </Grid>

      {/* Dynamic Message */}
      <Typography variant="h6" gutterBottom align="center" style={{ marginTop: "20px" }}>
        {message}
      </Typography>

      {/* Group Cards */}
      <Grid container spacing={2} justifyContent="center">
        {groups.map((group) => (
          <Grid item xs={12} sm={6} md={4} key={group._id}>
            <GroupCard group={group} size="large" navigateTo={navigateTo} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SearchGroup;
