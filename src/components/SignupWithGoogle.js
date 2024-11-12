import React from "react";
import { useEffect } from "react";
import { Box, Typography, Button, Paper, useMediaQuery } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useTheme } from "@mui/material/styles";

const SignupWithGoogle = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Redirects to Google OAuth for Sign-In
  const handleGoogleSignup = () => {
    window.location.href = "https://backend-location-social-media.onrender.com/auth/google?flow=signin";
  };

  // After redirect from Google OAuth, handle the token here
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token); // Store the token
      // Optionally update your auth state here
    }
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #004aad, #88c0ff)",
        p: isSmallScreen ? 2 : 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: isSmallScreen ? 3 : 4,
          width: "100%",
          maxWidth: isSmallScreen ? 300 : 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          borderRadius: 3,
          backgroundColor: "white",
        }}
      >
        {/* Logo and App Name */}
        <Box
          mb={3}
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            img: { height: isSmallScreen ? 48 : 64, marginBottom: 2 },
          }}
        >
          <img src="Geogram.png" alt="App Logo" />
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: isSmallScreen ? "1.5rem" : "2rem",
              color: "#004aad",
            }}
          >
            GeoGram
          </Typography>
        </Box>

        {/* Sign-In Text */}
        <Typography
          variant="h6"
          fontWeight="medium"
          mb={1}
          sx={{
            fontFamily: "'Inter', sans-serif",
            color: "#333333",
            fontSize: isSmallScreen ? "1rem" : "1.25rem",
          }}
        >
          Sign in to your account
        </Typography>
        <Typography
          color="text.secondary"
          mb={3}
          sx={{
            fontFamily: "'Inter', sans-serif",
            color: "#555555",
            fontSize: isSmallScreen ? "0.9rem" : "1rem",
          }}
        >
          Use your Google account to get started
        </Typography>

        {/* Google Sign-In Button */}
        <Button
          onClick={handleGoogleSignup}
          variant="outlined"
          color="inherit"
          startIcon={<GoogleIcon />}
          sx={{
            borderRadius: 2,
            fontWeight: "medium",
            textTransform: "none",
            fontFamily: "'Inter', sans-serif",
            borderColor: "#004aad",
            color: "#004aad",
            "&:hover": {
              backgroundColor: "#004aad",
              color: "white",
            },
            width: isSmallScreen ? "100%" : "auto",
            fontSize: isSmallScreen ? "0.875rem" : "1rem",
          }}
        >
          Sign in with Google
        </Button>
      </Paper>
    </Box>
  );
};

export default SignupWithGoogle;
