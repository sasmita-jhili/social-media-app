import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ExpandMore } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAction,
  likePostAction,
} from "../../redux/post/post.action";
const PostCard = ({ item }) => {
  const dispatch = useDispatch();

  const [showComments, setShowComments] = useState(false);

  const auth = useSelector((state) => state.auth);

  const handleShowComment = () => {
    setShowComments(!showComments);
  };

  const handleCreateComment = (content) => {
    const reqData = {
      postId: item.id,
      data: {
        content,
      },
    };
    dispatch(createCommentAction(reqData));
  };

  const isLikedByReqUSer = (reqUserId, post) => {
    for (let user of post.liked) {
      if (reqUserId === user.id) {
        return true;
      }
    }
    return false;
  };
  const handleLikePost = () => {
    dispatch(likePostAction(item.id));
  };
  // console.log("is Liked",isLikedByReqUSer(auth.user.id,item));
  return (
    <Card className="">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {item.user.firstName[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.user.firstName + " " + item.user.lastName}
        subheader={
          "@" +
          item.user.firstName.toLowerCase() +
          "_" +
          item.user.lastName.toLowerCase()
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={item.image}
        alt="Paella dish"
      />
     
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.caption}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between">
        <div>
          <IconButton onClick={handleLikePost}>
            {isLikedByReqUSer(auth.user?.id, item) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
          <IconButton onClick={handleShowComment}>
            <ChatBubbleIcon />
          </IconButton>
        </div>
        <div>
          <IconButton>
            {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>
      </CardActions>
      {showComments && (
        <section>
          <div className="flex items-center space-x-5 mx-3 my-5">
            <Avatar sx={{}} />
            <input
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  handleCreateComment(e.target.value);
                }
              }}
              className="w-full outline-none bg-transparent border 
            border-[#3b4054] rounded-full px-5 py-2"
              type="text"
              placeholder="write your comment......"
            />
          </div>
          <Divider />
          <div className="mx-3 space-y-2 my-5 text-xs">
            {item.comments.map((comment) => (
              <div key={comment.id} className="flex items-center space-x-5">
                <Avatar
                  sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }}
                >
                  {comment.user.firstName[0]}
                </Avatar>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </Card>
  );
};

export default PostCard;
