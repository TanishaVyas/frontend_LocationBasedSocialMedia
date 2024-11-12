import React from 'react';
import Grid from '@mui/material/Grid2';
import Post from './Post';
import useMediaQuery from '@mui/material/useMediaQuery';

function FeedPostViewer({ posts }) {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:601px) and (max-width:960px)');
  const isLargeScreen = useMediaQuery('(min-width:961px)');

  // Automatically determine the size based on screen width
  const responsiveSize = isSmallScreen ? 'small' : isMediumScreen ? 'medium' : 'large';

  return (
    <Grid container direction="column" spacing={2} style={{ padding: '16px' }}>
      {posts.map((post) => (
        <Grid item xs={12} key={post._id}> {/* Each post takes up full width */}
          <Post post={post} size={responsiveSize} /> {/* Pass responsive size to Post */}
        </Grid>
      ))}
    </Grid>
  );
}

export default FeedPostViewer;
