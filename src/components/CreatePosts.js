import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "../services/UserService.js";
import { fetchNearbyGroups } from "../services/groupService.js";
import {
  createPost,
  getAllPostsByGroupId,
  getAllPostsByUserId,
  likeOnPost, // New import for liking a post
  addComment, // New import for commenting on a post
} from "../services/postService.js";

function Posts() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [comment, setComment] = useState("");

  const [user, setUser] = useState(null);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);

  useEffect(() => {
    fetchGroups();
    getUserData();
  }, [navigate]);

  const getUserData = async () => {
    try {
      const userData = await fetchCurrentUser();
      if (userData && userData.username) {
        setUserId(userData._id);
        setUsername(userData.username);
      } else {
        alert("Username not found. Please log in.");
        navigate("/login"); // Redirect to login if no user data
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("An error occurred while fetching user data.");
    }
  };

  const fetchGroups = async () => {
    if (user && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLatitude(latitude);
        setUserLongitude(longitude);

        const nearbyGroups = await fetchNearbyGroups(latitude, longitude);
        console.log("fetching groups:", nearbyGroups);
        setGroups(nearbyGroups);
      });
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      alert("Please upload an image");
      return;
    }

    try {
      const GroupId = "672094a2c276786346a14ad7";
      await createPost({ image, userId, description, groupId: GroupId });
      await getAllPostsByGroupId({ groupId: GroupId });
      await getAllPostsByUserId({ userId });
      alert("Post created successfully!");
      setImage(null);
      setDescription("");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  const handleLike = async () => {
    try {
      await likeOnPost({ postId: "6723e6b17f5b7378658aa1cf", userId }); // Pass the post ID to like the post
      alert("Post liked successfully!");
    } catch (error) {
      console.error("Error liking post:", error);
      alert("Failed to like post. Please try again.");
    }
  };

  const handleComment = async () => {
    try {
      await addComment({
        postId: "6723e6b17f5b7378658aa1cf",
        userId,
        comment,
      });
      alert("Comment added successfully!");
      setComment(""); // Clear the comment input after submission
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment. Please try again.");
    }
  };

  return (
    <div>
      <h1>Create a Post</h1>
      <div>Username: {username}</div>
      <form id="postForm" onSubmit={handleSubmit}>
        <label htmlFor="groupSelect">Select Group:</label>
        <select
          id="groupSelect"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          required
        >
          <option value="672094a2c276786346a14ad7">
            672094a2c276786346a14ad7
          </option>
          {groups.map((group) => (
            <option key={group.id} value={group._id}>
              {group.name}
            </option>
          ))}
        </select>
        <br />
        <br />

        <label htmlFor="img">Upload Image:</label>
        <input
          type="file"
          id="img"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <br />
        <br />

        <label htmlFor="imgdesc">Image Description:</label>
        <input
          type="text"
          id="imgdesc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <br />

        <button type="submit">Create Post</button>
      </form>

      {/* Like and Comment section */}
      <div>
        <h2>Post Actions</h2>
        <button onClick={handleLike}>Like Post</button>

        <div>
          <label htmlFor="commentInput">Add a Comment:</label>
          <input
            type="text"
            id="commentInput"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleComment}>Comment</button>
        </div>
      </div>
    </div>
  );
}

export default Posts;
