import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "../services/UserService.js";
import { createPost } from "../services/postService.js";

function Posts() {
  const { groupId } = useParams(); // Get groupId from URL
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (!groupId) {
      // Redirect to search if no group ID is found
      navigate("/search");
    } else {
      getUserData();
    }
  }, [groupId]);

  const getUserData = async () => {
    try {
      const userData = await fetchCurrentUser();
      setUserId(userData._id);
      setUsername(userData.username);
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("An error occurred. Please log in.");
      navigate("/login"); // Redirect to login if there's an error
    }
  };

  const handleImageChange = (event) => setImage(event.target.files[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      alert("Please upload an image");
      return;
    }
    try {
      await createPost({ image, userId, description, groupId });
      alert("Post created successfully!");
      setImage(null);
      setDescription("");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <div>
      <h1>Create a Post in Group {groupId}</h1>
      <form id="postForm" onSubmit={handleSubmit}>
        <label htmlFor="img">Upload Image:</label>
        <input type="file" id="img" accept="image/*" onChange={handleImageChange} required />
        <br />
        <label htmlFor="imgdesc">Image Description:</label>
        <input type="text" id="imgdesc" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default Posts;
