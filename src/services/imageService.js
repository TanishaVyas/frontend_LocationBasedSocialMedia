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
        setUpdatedUser({...updatedUser, profilePic: reader.result });
    };
    if (file) {
        reader.readAsDataURL(file);
    }
};

export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result); // This will include the full data URL with MIME type
        };
        reader.onerror = () => {
            reject("Failed to convert image to base64");
        };
        reader.readAsDataURL(file);
    });
};