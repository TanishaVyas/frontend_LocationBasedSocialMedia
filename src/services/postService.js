import { fetchCurrentUser } from "./UserService";
import { convertToBase64 } from "./imageService"
//used in createpost.js http://localhost:3000/createpost
/*
everypage has userid of the active user u can get it from there (stored in local storage/ function fetchcurrentuser in userservice) 
fetchNearByGroups in groupservice gives groupid too
*/
export const createPost = async({ image, userId, description, groupId, latitude, longitude }) => {
    try {
        const imgBase64 = await convertToBase64(image);
        const postData = {
            userId,
            groupId,
            img: imgBase64,
            imgdesc: description,
            latitude,
            longitude,
        };

        const response = await fetch("https://backend-location-social-media.onrender.com/post/create-post", {
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

/*example format:

comments: Array(1)   [0:{ 
    comment: "yes "
    createdAt: "2024-11-01T09:49:47.614Z"
    userId: "6720781d989ac7ab22e46160"
    _id: "6724a43bfac9c4a31e36aa35"
    }
  ]
createdAt: "2024-10-31T20:21:05.634Z"
fromSameLocation: false
groupId: "672094a2c276786346a14ad8"
img: "iVBORw0KGgoAAAANSUhEUgAABKoAAADnCAYAAAA+ab6yAAAAA
imgdesc: "blahblahblahblahblha"
likeCounter: 3
likedBy: (2) ['6720781d989ac7ab22e46160', '671fcdb3c9104e9b72d72081']
userId: "6720781d989ac7ab22e46160"
__v: 2
_id: "6723e6b17f5b7378658aa1cf"
 */
export const getAllPosts = async() => {
    try {
        const response = await fetch("https://backend-location-social-media.onrender.com/post/getAllPost", {
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

export const deletePost = async(postId) => {
    try {
        const response = await fetch("https://backend-location-social-media.onrender.com/post/deletePost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ postId }),
        });

        if (!response.ok) throw new Error("Failed to delete post");

        const result = await response.json();
        console.log("Post deleted successfully:", result);

        return result || {};
    } catch (error) {
        console.error("Error deleting post:", error);
        return null;
    }
};
export const getAllPostsByGroupId = ({ groupId }) => {
    return new Promise(async(resolve, reject) => {
        try {
            const response = await fetch(
                "https://backend-location-social-media.onrender.com/post/getAllPostByGroupId", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ groupId }) // Send as an object
                }
            );

            if (!response.ok) throw new Error("Failed to get posts");

            const result = await response.json();
            const posts = result.data;
            console.log("All Posts by group Id:", posts);

            resolve(posts || []);
        } catch (error) {
            console.error("Error fetching posts", error);
            resolve([]);
        }
    });
};


export const getAllPostsByUserId = async(UserId) => {
    try {
        const response = await fetch(
            "https://backend-location-social-media.onrender.com/post/getAllPostByUserId", {
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

export const getAllPostByDistance = (setUser) => {
    return new Promise((resolve, reject) => {
        fetchCurrentUser()
            .then((userData) => {
                if (userData) {
                    setUser(userData);

                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            async(position) => {
                                const { latitude, longitude } = position.coords;
                                console.log("Position:", latitude, longitude);

                                try {
                                    // Fetch posts by distance
                                    const response = await fetch(
                                        "https://backend-location-social-media.onrender.com/post/getAllPostByDistance", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ latitude, longitude }),
                                        }
                                    );

                                    if (!response.ok) throw new Error("Failed to get posts");

                                    const result = await response.json();
                                    const posts = result.data;
                                    console.log("All Posts by distance:", posts);

                                    resolve(posts || []); // Resolve the promise with posts
                                } catch (error) {
                                    console.error("Error fetching posts:", error);
                                    reject([]); // Reject with an empty array in case of error
                                }
                            },
                            (error) => {
                                console.error("Geolocation error:", error);
                                reject([]); // Reject with an empty array in case of geolocation error
                            }
                        );
                    } else {
                        console.error("Geolocation is not supported by this browser.");
                        reject([]); // Reject with an empty array if geolocation is not supported
                    }
                } else {
                    reject([]); // Reject with an empty array if user data is not found
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                reject([]); // Reject with an empty array in case of fetchCurrentUser error
            });
    });
};


export const likeOnPost = async(PostId, userId) => {
    try {
        const response = await fetch("https://backend-location-social-media.onrender.com/post/likeOnPost", {
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

export const addComment = async(postId, userId, comment) => {
    try {
        const response = await fetch("https://backend-location-social-media.onrender.com/post/addComment", {
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