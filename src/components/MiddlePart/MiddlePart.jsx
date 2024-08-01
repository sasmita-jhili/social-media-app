import { Avatar, Card, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import StoryCircle from "./StoryCircle";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import PostCard from "../Post/PostCard";
import CreatePostModal from "../CreatePost/CreatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostAction } from "../../redux/post/post.action";

const story = [1, 1, 1, 1, 1];
const MiddlePart = () => {
  const dispatch = useDispatch();

  const post = useSelector((store) => store.post);
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);

  const closeModal = () => {
    setOpenCreatePostModal(false);
  };
  const handleOpenCreatePostModal = () => {
    setOpenCreatePostModal(true);
  };
  useEffect(() => {
    dispatch(getAllPostAction());
  }, [post.newComment]);

  return (
    <div className="px-20">
      <section className="flex items-center p-5 mx-2.5 rounded-b-md">
        <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar sx={{ width: "4rem", height: "4rem" }}>
            <AddIcon sx={{ fontSize: "3rem" }} />
          </Avatar>
          <p>New</p>
        </div>
        {story.map((item, index) => (
          <StoryCircle key={index} />
        ))}
      </section>
      <Card className="p-5 mt-5 ml-6">
        <div className="flex justify-between">
          <Avatar />
          <input
            onClick={handleOpenCreatePostModal}
            readOnly
            className="outline-none w-[90%] bg-slate-100 
             rounded-full px-5 bg-transparent
             border-[#3b4054] border"
            type="text"
            placeholder="Create new post...."
          />
        </div>
        <div className=" flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <ImageIcon />
            </IconButton>
            <span>Media</span>
          </div>
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <VideocamIcon />
            </IconButton>
            <span>Video</span>
          </div>
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <ArticleIcon />
            </IconButton>
            <span>Write Article</span>
          </div>
        </div>
      </Card>
      <div className="mt-5 space-y-5 ml-6">
        
        {post.posts.map((item) => (
          <PostCard key={item.id} item={item} />
        ))}
      </div>
      <div>
        <CreatePostModal
          openCreatePostModal={openCreatePostModal}
          closeModal={closeModal}
        />
      </div>
    </div>
  );
};

export default MiddlePart;
