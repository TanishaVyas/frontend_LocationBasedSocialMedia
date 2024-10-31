export const createPost = async ({ image, username, description, groupId }) => {
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
      username: username,
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
    console.log("Response from server:", result);

    return result.data || [];
  } catch (error) {
    console.error("Error fetching posts", error);
    return [];
  }
};
