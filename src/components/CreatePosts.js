import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "../services/UserService.js"; // Adjust path as needed

function Posts() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("abc"); // Default group ID
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchGroups();
    getUserData();
  }, [navigate]);

  const getUserData = async () => {
    try {
      const userData = await fetchCurrentUser();
      if (userData && userData.username) {
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
    try {
      const response = await fetch("http://localhost:8080/get-groups");
      if (response.ok) {
        const data = await response.json();
        setGroups(data.groups);
      } else {
        console.error("Failed to fetch groups");
        alert("Error fetching groups. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching groups.");
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

    // Convert image file to base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const imgBase64 = reader.result.split(",")[1]; // Get base64 part

      // Prepare data for submission
      const postData = {
        username: username,
        groupId: "672094a2c276786346a14ad7", // Default to "The Charcoal Pit"
        img: imgBase64,
        imgdesc: description,
      };

      // Send data to backend
      try {
        const response = await fetch("http://localhost:8080/auth/create-post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        const result = await response.json();
        if (response.ok) {
          alert("Post created successfully!");
          navigate("/dashboard");
        } else {
          alert(result.error || "Failed to create post. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting post:", error);
        alert("An error occurred while creating the post.");
      }
    };
    reader.readAsDataURL(image);
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
            <option key={group.id} value="672094a2c276786346a14ad7">
              672094a2c276786346a14ad7
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
    </div>
  );
}

export default Posts;
