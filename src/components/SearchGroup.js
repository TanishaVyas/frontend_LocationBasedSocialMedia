import React, { useState, useEffect, useRef } from "react";
import GroupCard from "./GroupCard";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { fetchNearbyGroups } from "../services/groupService";
import { fetchAllCategories } from "../services/groupService";

const SearchGroup = () => {
  const [user, setUser] = useState(null);
  const [allGroups, setAllGroups] = useState([]); // All groups
  const [groups, setGroups] = useState([]); // Filtered groups to display
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // New state for category
  const [message, setMessage] = useState("Nearby groups");
  const [categories, setCategories] = useState([]);

  // Fetch categories and groups when component mounts
  useEffect(() => {
    fetchAllCategories()
      .then((fetchedCategories) => {
        setCategories(fetchedCategories);
      })
      .catch((error) => console.error("Error fetching categories:", error));

    fetchNearbyGroups(setUser)
      .then((nearbyGroups) => {
        setAllGroups(nearbyGroups); // Store all groups
        setGroups(nearbyGroups); // Initially display all groups
      })
      .catch((error) => console.error(error));
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    filterGroups(event.target.value, selectedCategory);
  };

  // Handle category selection change
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    filterGroups(searchInput, category);
  };

  // Function to filter groups by search input and category
  const filterGroups = (name, category) => {
    let filteredGroups = allGroups;

    // Search filter
    if (name) {
      filteredGroups = filteredGroups.filter((group) =>
        group.name.toLowerCase().includes(name.toLowerCase())
      );
      setMessage(`Searching for groups with "${name}"`);
    } else {
      setMessage("Nearby groups");
    }

    // Category filter
    if (category) {
      filteredGroups = filteredGroups.filter(
        (group) => group.category.toLowerCase() === category.toLowerCase()
      );
      setMessage(`Filtering groups in category "${category}"`);
    }

    setGroups(filteredGroups);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* Search Bar */}
      <TextField
        label="Search Groups"
        variant="outlined"
        value={searchInput}
        onChange={handleSearchChange}
        style={{ marginBottom: "20px", width: "100%", maxWidth: "600px" }}
      />

      {/* Category Filter */}
      <FormControl
        style={{ marginBottom: "20px", width: "100%", maxWidth: "600px" }}
      >
        <InputLabel>Filter by Category</InputLabel>
        <Select
          value={selectedCategory} // Set value to the selected category state
          onChange={handleCategoryChange} // Updated event handler
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

      {/* Dynamic Message */}
      <Typography variant="h6" gutterBottom>
        {message}
      </Typography>

      {/* Group Cards */}
      <Grid container spacing={2} justifyContent="center">
        {groups.map((group) => (
          <Grid item xs={12} sm={6} md={4} key={group._id}>
            <GroupCard group={group} size="large" />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SearchGroup;
