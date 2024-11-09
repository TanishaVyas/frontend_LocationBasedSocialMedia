import React from 'react';
import { Card, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const GroupCard = ({ group, size = 'medium', navigateTo }) => {
  const navigate = useNavigate(); // Initialize navigate

  // Define size variants
  const sizes = {
    small: 150,
    medium: 200,
    large: 250,
  };

  const cardSize = sizes[size] || sizes.medium; // Default to 'medium' if no valid size is provided

  const handleCardClick = () => {
    const path = navigateTo === "posts" ? `/posts/${group._id}` : `/group/${group._id}`;
    navigate(path); // Dynamically navigate based on `navigateTo` prop
  };

  return (
    <Card 
      sx={{ position: 'relative', width: cardSize, height: cardSize, overflow: 'hidden' }} 
      onClick={handleCardClick} // Add onClick handler
      style={{ cursor: 'pointer' }} // Change cursor to pointer to indicate clickability
    >
      {/* Placeholder image with dynamic size */}
      <CardMedia
        component="img"
        height={cardSize}
        image={`https://via.placeholder.com/${cardSize}`} // Placeholder image size adjusted
        alt={group.name}
        sx={{ opacity: 0.5 }}
      />
      {/* Group name centered on the card */}
      <Typography
        variant="h6"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'black',
          fontWeight: 'bold',
        }}
      >
        {group.name}
      </Typography>
    </Card>
  );
};

export default GroupCard;
