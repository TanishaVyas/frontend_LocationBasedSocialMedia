/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { ImageList, ImageListItem } from '@mui/material';

function ImageViewer({ images }) {
  return (
    <ImageList
      cols={3} // Sets a 3-column layout
      gap={8}  // Space between items
      sx={{
        width: '100%',
        maxWidth: '100%',
        maxHeight: '80vh', // Adjust as needed for scrollable area
        scrollbarWidth: "none", // Firefox
        "&::-webkit-scrollbar": { display: "none" },
        padding: 2,
      }}
    >
      {images.map((image, index) => (
        <ImageListItem key={index}>
          <img
            src={image}
            alt={`Image ${index + 1}`}
            loading="lazy"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 8, // Optional: Adds rounded corners
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default ImageViewer;
