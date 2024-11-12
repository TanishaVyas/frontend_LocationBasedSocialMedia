import React from 'react';
import Grid from '@mui/material/Grid2';
import Post from './Post';
import useMediaQuery from '@mui/material/useMediaQuery';

function PostViewer({ posts, size = 'medium' }) {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:601px) and (max-width:960px)');
  const isLargeScreen = useMediaQuery('(min-width:961px)');

  // Determine the size based on screen width if not explicitly provided
  const responsiveSize = isSmallScreen ? 'small' : isMediumScreen ? 'medium' : 'large';

  const styles = {
    postViewerContainer: {
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      padding: '16px',
      height: '100vh',  // Full height to help with spacing
    },
  };

  return (
    <div style={styles.postViewerContainer}>
      <Grid 
        container 
        spacing={3}  // Controls space between posts
        justifyContent="space-between"  // Ensures equal horizontal spacing
        alignItems="stretch"  // Makes sure all items stretch vertically
      >
        {posts.map((post) => (
          <Grid
            item
            xs={12}  // Full width on small screens
            sm={6}   // 2 posts per row on medium screens
            md={6}   // 2 posts per row on large screens
            key={post._id}
          >
            <Post post={post} size={responsiveSize} allowDelete={true} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default PostViewer;
