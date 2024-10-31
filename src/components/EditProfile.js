import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { updateUserProfile } from "../services/UserService";
import NotificationPopup from "./NotificationPopup";
import { changeImageToBase64 } from "../services/imageService";

function EditProfile({ open, onClose, user, onSave }) {
  const [updatedUser, setUpdatedUser] = useState({
    email: user.email,
    username: user.username,
    bio: user.bio,
    profilePic: user.profilePic,
    phone: user.phone,
    dob: user.dob,
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  // Usage inside a component
  const onImageChange = (e) =>
    changeImageToBase64(e, setImageFile, setUpdatedUser, updatedUser);

  const handleSave = async () => {
    try {
      const updatedData = await updateUserProfile(updatedUser);
      onSave(updatedData);
      onClose();
      setNotification({
        open: true,
        type: "success",
        message: "Profile updated successfully!",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      setNotification({
        open: true,
        type: "failure",
        message: "Failed to update profile. Please try again.",
      });
    }
  };
  const [notification, setNotification] = useState({
    open: false,
    type: "success",
    message: "",
  });
  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };
  return (
    <>
      <Modal open={open} onClose={onClose} aria-labelledby="edit-profile-modal">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2 id="edit-profile-modal">Edit Profile</h2>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={updatedUser.username}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Bio"
            name="bio"
            value={updatedUser.bio}
            onChange={handleChange}
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            name="phone"
            value={updatedUser.phone}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Date of Birth"
            name="dob"
            type="date"
            value={updatedUser.dob}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            style={{ marginTop: 16 }}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Notification Popup for Success or Failure */}
      <NotificationPopup
        open={notification.open}
        type={notification.type}
        message={notification.message}
        onClose={handleNotificationClose}
      />
    </>
  );
}

export default EditProfile;
