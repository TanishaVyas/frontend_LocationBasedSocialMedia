import { fetchCurrentUser } from "./UserService";
export const createPost = async ({ image, userId, description, groupId }) => {
  try {
    const imgBase64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = () => {
        reject("Failed to convert image to base64");
      };
      reader.readAsDataURL(image);
    });

    const postData = {
      userId: userId,
      groupId: groupId,
      img: imgBase64,
      imgdesc: description,
    };

    const response = await fetch("http://localhost:8080/post/create-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Post created successfully!");
    } else {
      alert(result.error || "Failed to create post. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting post:", error);
    alert("An error occurred while creating the post.");
  }
};

export const getAllPosts = async () => {
  try {
    const response = await fetch("http://localhost:8080/post/getAllPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
    });

    if (!response.ok) throw new Error("Failed to get posts");

    const result = await response.json();
    const post = result.data;
    console.log("All Posts:", post);

    return post || [];
  } catch (error) {
    console.error("Error fetching posts", error);
    return [];
  }
};

export const getAllPostsByGroupId = async (groupId) => {
  try {
    const response = await fetch(
      "http://localhost:8080/post/getAllPostByGroupId",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groupId),
      }
    );

    if (!response.ok) throw new Error("Failed to get posts");

    const result = await response.json();
    const post = result.data;
    console.log("All Posts by group Id:", post);

    return post || [];
  } catch (error) {
    console.error("Error fetching posts", error);
    return [];
  }
};

export const getAllPostsByUserId = async (UserId) => {
  try {
    const response = await fetch(
      "http://localhost:8080/post/getAllPostByUserId",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(UserId),
      }
    );

    if (!response.ok) throw new Error("Failed to get posts");

    const result = await response.json();
    const post = result.data;
    console.log("All Posts by User id :", post);

    return post || [];
  } catch (error) {
    console.error("Error fetching posts", error);
    return [];
  }
};

export const getAllPostByDistance = async (setUser) => {
  try {
    // Fetch the current user data
    const userData = await fetchCurrentUser();
    if (userData) {
      setUser(userData);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            console.log("Position:", latitude, longitude);

            // Fetch posts by distance
            const response = await fetch(
              "http://localhost:8080/post/getAllPostByDistance",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ latitude, longitude }), // Corrected body format
              }
            );

            if (!response.ok) throw new Error("Failed to get posts");

            const result = await response.json();
            const posts = result.data;
            console.log("All Posts by distance:", posts);

            return posts || [];
          },
          (error) => {
            console.error("Geolocation error:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const likeOnPost = async (PostId, userId) => {
  try {
    const response = await fetch("http://localhost:8080/post/likeOnPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(PostId, userId),
    });

    if (!response.ok) throw new Error("Failed to like a post:", response);

    const result = await response.json();
    const post = result.data;
    console.log("post added sucessfully :", post);

    return post || [];
  } catch (error) {
    console.error("Error fetching posts", error);
    return [];
  }
};

export const addComment = async (postId, userId, comment) => {
  try {
    const response = await fetch("http://localhost:8080/post/addComment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postId, userId, comment),
    });

    if (!response.ok) throw new Error("Failed to add comment");

    const result = await response.json();
    const post = result.data;
    console.log("comment added :", post);

    return post || [];
  } catch (error) {
    console.error("Error fetching posts", error);
    return [];
  }
};
