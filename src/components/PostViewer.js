import React from 'react';
import Grid from '@mui/material/Grid2';
import Post from './Post';

function PostViewer({ posts, size = 'medium' }) {
  const getPostWidth = () => {
    switch (size) {
      case 'small':
        return '25%'; // Smaller posts
      case 'large':
        return '50%'; // Larger posts
      default:
        return '33.33%'; // Default medium size
    }
  };

  const styles = {
    postViewerContainer: {
      display: 'flex',
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      padding: '16px',
    },
    gridItem: {
      display: 'inline-block',
      width: getPostWidth(), // Dynamically adjust width based on size
      minWidth: '300px', // Optional: set a minimum width for posts
    },
  };

  return (
    <div style={styles.postViewerContainer}>
      {posts.map((post) => (
        <div style={styles.gridItem} key={post._id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}

export default PostViewer;
