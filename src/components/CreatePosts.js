import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "../services/UserService.js";
import { createPost } from "../services/postService.js";

function Posts() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if (!groupId) {
      navigate("/search");
    } else {
      getUserData();
    }
    fetchLocation(); // Fetch user's location when component mounts
  }, [groupId]);

  const getUserData = async () => {
    try {
      const userData = await fetchCurrentUser();
      setUserId(userData._id);
      setUsername(userData.username);
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("An error occurred. Please log in.");
      navigate("/login");
    }
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error fetching location:", error.message);
          alert("Failed to retrieve location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
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
      await createPost({
        image,
        userId,
        description,
        groupId,
        latitude: location.latitude,
        longitude: location.longitude,
      });
      alert("Post created successfully!");
      setImage(null);
      setDescription("");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f4f6f8"
    }}>
      <form
        id="postForm"
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%"
        }}
      >
        <h1 style={{
          textAlign: "center",
          fontSize: "1.5rem",
          color: "#333",
          marginBottom: "1.5rem"
        }}>
          Create a Post in Group {groupId}
        </h1>
        <label htmlFor="img" style={{
          fontWeight: "bold",
          color: "#555",
          display: "block",
          marginBottom: "0.5rem"
        }}>
          Upload Image:
        </label>
        <input
          type="file"
          id="img"
          accept="image/*"
          onChange={handleImageChange}
          required
          style={{
            width: "100%",
            padding: "0.75rem",
            marginBottom: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box"
          }}
        />
        <label htmlFor="imgdesc" style={{
          fontWeight: "bold",
          color: "#555",
          display: "block",
          marginBottom: "0.5rem"
        }}>
          Image Description:
        </label>
        <input
          type="text"
          id="imgdesc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.75rem",
            marginBottom: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box"
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.3s ease"
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

export default Posts;