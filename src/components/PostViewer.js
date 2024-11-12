import React from 'react';
import Post from './Post';
import useMediaQuery from '@mui/material/useMediaQuery';

function PostViewer({ posts, size = 'medium' }) {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:601px) and (max-width:960px)');
  const isLargeScreen = useMediaQuery('(min-width:961px)');

  // Determine the size based on screen width if not explicitly provided
  const responsiveSize = isSmallScreen ? 'small' : isMediumScreen ? 'medium' : 'large';

  const getGridColumns = () => {
    if (isSmallScreen) return 'repeat(1, 1fr)';
    if (isMediumScreen) return 'repeat(2, 1fr)';
    if (isLargeScreen) return 'repeat(2, 1fr)';
    return 'repeat(auto-fill, minmax(300px, 1fr))';
  };

  const styles = {
    postViewerContainer: {
      display: 'grid',
      gridTemplateColumns: getGridColumns(),
      gap: '16px',
      overflowY: 'auto',
      padding: '16px',
      height: '100vh', // Adjust height if needed
    },
  };

  return (
    <div style={styles.postViewerContainer}>
      {posts.map((post) => (
        <Post key={post._id} post={post} size={responsiveSize} />
      ))}
    </div>
  );
}

export default PostViewer;
