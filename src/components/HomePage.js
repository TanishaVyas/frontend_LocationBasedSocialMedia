import React, { useEffect, useState } from 'react';
import FeedPostViewer from './FeedPostViewer';
import { getAllPostByDistance } from '../services/postService';

function HomePage() {
  const [posts, setPosts] = useState([]); // Initialize as an empty array
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts based on location
        const fetchedPosts = await getAllPostByDistance(setUser);

        // If data is valid and returned as an array
        if (fetchedPosts && Array.isArray(fetchedPosts)) {
          setPosts(fetchedPosts); // Update posts state
        } else {
          console.error("No posts returned from the service.");
        }
      } catch (error) {
        console.error("Failed to load posts:", error);
      } finally {
        setLoading(false); // Set loading to false once data fetching is done
      }
    };

    fetchPosts(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs once on mount

  // Conditional rendering while loading
  if (loading) {
    return <div>Loading posts...</div>; // Show loading message or spinner
  }

  // After data is fetched, render the FeedPostViewer
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', // Center horizontally
      alignItems: 'center', // Center vertically
      minHeight: '100vh', // Ensure full screen height
      padding: '16px', // Optional padding around the content
      boxSizing: 'border-box', // Include padding in element's total width/height
    }}>
      <FeedPostViewer posts={posts} />
    </div>
  );

}

export default HomePage;
