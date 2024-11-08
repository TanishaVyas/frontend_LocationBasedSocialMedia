import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Importing the location icon
import { fetchGroupDetails } from "../services/groupService";

function Post({ post, size = 'medium' }) {
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    // Fetch group details using the groupId from post
    const fetchGroup = async () => {
      try {
        if(post.groupId.name==null){
        const groupData = await fetchGroupDetails({groupId:post.groupId});
        setGroupName(groupData.name);}
        else{
          setGroupName(post.groupId.name);
        }
         // Assuming the group name is in 'name' field
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };

    if (post.groupId) {
      fetchGroup();
    }
  }, [post.groupId]);

  // Dynamically set the size based on the `size` prop
  const getCardSize = () => {
    switch (size) {
      case 'small':
        return { width: 250, height: 400 }; // Smaller card size
      case 'large':
        return { width: 400, height: 550 }; // Larger card size
      default:
        return { width: 345, height: 500 }; // Default medium size
    }
  };

  const cardSize = getCardSize();

  // Calculate image height as a proportion of the card width (for example, 3:4 aspect ratio)
  const getImageHeight = () => {
    const aspectRatio = 3 / 4; // Change this if you need a different ratio (e.g., 16/9)
    return cardSize.width * aspectRatio;
  };

  const imageHeight = getImageHeight();

  return (
    <Card sx={{ width: cardSize.width, height: cardSize.height, marginBottom: 2, position: 'relative' }}>
      
      {/* Box to show Group Name */}
      {groupName && (
        <Box
          sx={{
            width: '100%',
            backgroundColor: 'grey', // Black background
            color: 'white',
            textAlign: 'center',

          }}
        >
          <Typography variant="body2">
            {groupName}
          </Typography>
        </Box>
      )}

      <CardMedia
        component="img"
        sx={{
          height: imageHeight,
          objectFit: 'cover', // Ensure the image maintains its aspect ratio and fits within the car
        }}
        image={post.img} // Assuming img is a base64 string or a URL
        alt="Post Image"
      />
      <CardContent sx={{ paddingTop: '16px' }}>
        <Typography variant="h6" component="div" sx={{ wordBreak: 'break-word' }}>
          {post.imgdesc}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Likes: {post.likeCounter}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Comments: {post.comments.length}
        </Typography>

        {/* Location status: Red or Green depending on 'fromSameLocation' */}
        <IconButton aria-label="location" sx={{ color: post.fromSameLocation ? 'green' : 'red' }}>
          <LocationOnIcon />
        </IconButton>

        <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default Post;
