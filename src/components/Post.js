import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchGroupDetails } from "../services/groupService";
import { likeOnPost, addComment, deletePost } from "../services/postService";
import { getUserById } from "../services/UserService";
import { useNavigate } from "react-router-dom";

function Post({ post, size = "medium", allowDelete = false }) {
  const [groupName, setGroupName] = useState("");
  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCounter, setLikeCounter] = useState(post.likeCounter);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [postUser, setPostUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        "https://backend-location-social-media.onrender.com/auth/current_user",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          credentials: "include",
        }
      );
      const userData = await response.json();
      setUser(userData);
      if (post.likedBy.includes(userData._id)) {
        setLiked(true);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPostUser = async () => {
      try {
        const userData = await getUserById(post.userId);
        setPostUser(userData);
      } catch (error) {
        console.error("Error fetching post user:", error);
      }
    };
    if (post.userId) {
      fetchPostUser();
    }
  }, [post.userId]);

  const handleLike = async () => {
    try {
      const updatedPost = await likeOnPost({
        postId: post._id,
        userId: user._id,
      });
      setLiked(!liked);
      setLikeCounter(updatedPost.likeCounter);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async () => {
    try {
      const newComment = await addComment({
        postId: post._id,
        userId: user._id,
        comment: commentText,
      });
      setComments((prevComments) => [...prevComments, newComment]);
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(post._id);
      console.log("Post deleted successfully");
      alert("Post deleted successfully!");
      window.location.reload();
      // Handle post deletion (e.g., update parent component's state or UI)
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        if (post.groupId.name == null) {
          const groupData = await fetchGroupDetails({ groupId: post.groupId });
          setGroupName(groupData.name);
        } else {
          setGroupName(post.groupId.name);
        }
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };
    if (post.groupId) {
      fetchGroup();
    }
  }, [post.groupId]);

  const getCardSize = () => {
    switch (size) {
      case "small":
        return { width: "100%", maxWidth: 400, height: 400 };
      case "large":
        return { width: "100%", maxWidth: 550, height: 550 };
      default:
        return { width: "100%", maxWidth: 500, height: 500 };
    }
  };

  const cardSize = getCardSize();
  const imageHeight = cardSize.height * (3 / 4);

  return (
    <Card
      sx={{
        width: cardSize.width,
        maxWidth: cardSize.maxWidth,
        marginBottom: 2,
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {groupName && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "0.8rem",
            paddingBottom: "0.8rem",
            width: "100%",
            backgroundColor: "white",
            color: "black",
            textAlign: "center",
            borderColor: "#D9D9D9",
            borderBottom: "1px solid #000000",
          }}
        >
          <Typography
            onClick={() => navigate(`/group/${post.groupId._id}`)}
            variant="h6"
            sx={{
              cursor: "pointer",
              flex: 1,
              textAlign: "left",
              paddingLeft: 2,
            }}
          >
            {groupName}
          </Typography>
          {allowDelete && post.userId === user?._id && (
        
          
              <IconButton onClick={handleDelete}>
                <DeleteIcon color="error" />
              </IconButton>
            
          )}
        </Box>
      )}

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: imageHeight,
            height: imageHeight,
            objectFit: "cover",
          }}
          image={post.img}
          alt="Post Image"
        />
      </Box>
      <CardContent
        sx={{
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ wordBreak: "break-word" }}
        >
          {post.imgdesc}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          By: {postUser?.name || "Unknown"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Likes: {likeCounter}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Comments: {comments.length}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            aria-label="location"
            sx={{ color: post.fromSameLocation ? "green" : "red" }}
          >
            <LocationOnIcon />
          </IconButton>
          <IconButton aria-label="like" onClick={handleLike} disabled={liked}>
            <FavoriteIcon sx={{ color: liked ? "red" : "default" }} />
          </IconButton>
          <TextField
            variant="outlined"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            size="small"
            sx={{ flexGrow: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton color="primary" onClick={handleComment}>
                    <CommentIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <List
          sx={{
            maxHeight: 150,
            overflow: "auto",
            marginTop: 1,
            scrollbarWidth: "none",
          }}
        >
          {comments.map((comment) => (
            <ListItem
              key={comment._id}
              sx={{ paddingLeft: 0, paddingRight: 0 }}
            >
              <ListItemText
                primary={comment.comment}
                secondary={new Date(comment.createdAt).toLocaleString()}
                primaryTypographyProps={{ variant: "body2" }}
                secondaryTypographyProps={{ variant: "caption" }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default Post;
