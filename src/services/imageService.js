export const changeImageToBase64 = (
  e,
  setImageFile,
  setUpdatedUser,
  updatedUser
) => {
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
