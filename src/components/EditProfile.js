// components/EditProfile.js
import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { updateUserProfile } from "../services/UserService";

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setUpdatedUser({ ...updatedUser, profilePic: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const updatedData = await updateUserProfile(updatedUser);
      onSave(updatedData);
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-profile-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
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
        <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginTop: 16 }} />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EditProfile;
