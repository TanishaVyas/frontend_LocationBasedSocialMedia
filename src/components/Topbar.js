// src/components/Topbar.js
import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

function Topbar() {
  return (
    <AppBar position="fixed" sx={{ top: 0, backgroundColor: "#ffffff" }}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {/* Logo on the left */}
        <Box sx={{ width: 40, height: 40 }}>
          <img
            src="Geogram.png"
            alt="Logo"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>

        {/* Geogram text on the left */}
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Alex Brush', cursive",
            fontSize: "30px",
            color: "#000000", // White color for the text
            display: { md: "block" }, // Hide on smaller screens if needed
          }}
        >
          Geogram
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
