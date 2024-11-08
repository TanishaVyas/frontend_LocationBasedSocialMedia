import React from 'react';
import Grid from '@mui/material/Grid2';
import Post from './Post';

function FeedPostViewer({ posts, size = 'large' }) {
  return (
    <Grid container direction="column" spacing={2} style={{ padding: '16px' }}>
      {posts.map((post) => (
        <Grid item xs={12} key={post._id}> {/* Each post takes up full width */}
          <Post post={post} size={size} /> {/* Pass size prop to Post */}
        </Grid>
      ))}
    </Grid>
  );
}

export default FeedPostViewer;
