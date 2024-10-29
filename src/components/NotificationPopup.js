import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const NotificationPopup = ({ open, type, message, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="notification-popup">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          border: `2px solid ${type === 'success' ? '#004aad' : '#ff0000'}`,
        }}
      >
        {type === 'success' ? (
          <CheckCircleIcon sx={{ color: '#004aad', fontSize: 48, mb: 1 }} />
        ) : (
          <ErrorIcon sx={{ color: '#ff0000', fontSize: 48, mb: 1 }} />
        )}
        <Typography
          variant="h6"
          sx={{ color: type === 'success' ? '#004aad' : '#ff0000', mb: 2 }}
        >
          {type === 'success' ? "Success" : "Failure"}
        </Typography>
        <Typography variant="body1" color="textPrimary" sx={{ mb: 2 }}>
          {message}
        </Typography>
        <Button variant="contained" color={type === 'success' ? "primary" : "error"} onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default NotificationPopup;
