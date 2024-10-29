import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Snackbar,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import LocationFinder from "./locationfinder";
function Admin() {
  const navigate = useNavigate();
  const [isLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const goToLocationFinder = () => {
    navigate("/location-finder");
  };

  const handleLogout = () => {
    window.location.href = "http://localhost:8080/auth/logout";
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* App Bar */}
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleLogout}
            disabled={isLoading}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, marginBottom:"10px"}}>
        <Typography variant="h5" gutterBottom>
          Welcome to the Admin Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Here you can manage your application settings and user data.
        </Typography>
        
        

        {error && (
          <Paper
            sx={{
              backgroundColor: "red.100",
              border: "1px solid red",
              color: "red.700",
              p: 2,
              mt: 2,
            }}
          >
            <Typography variant="body2">{error}</Typography>
          </Paper>
        )}
      </Paper>
      <LocationFinder  />
      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message={error ? error : "Action successful!"}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
}

export default Admin;
