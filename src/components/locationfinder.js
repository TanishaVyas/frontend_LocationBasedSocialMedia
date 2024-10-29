import React, { useState } from "react";
import axios from "axios";

const LocationForm = () => {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city || !category) {
      alert("Please enter a city and select a category");
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
    } catch (error) {
      console.error("Error saving locations:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select category</option>
        <option value="college|university">University/College</option>
        <option value="hospital">Hospital</option>
        <option value="restaurant|cafe">Restaurant/cafe</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LocationForm;
