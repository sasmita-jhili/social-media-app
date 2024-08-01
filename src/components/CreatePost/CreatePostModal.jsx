import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { UploadToCloudinary } from "../../utils/UploadToCloudinary";
import { useDispatch } from "react-redux";
import { createCommentAction, createPostAction } from "../../redux/post/post.action";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: ".6rem",
  outline: "none",
};

const CreatePostModal = ({ openCreatePostModal, closeModal }) => {
  const [selectedImage, setSelectedImage] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSelectImage = async (event) => {
    setIsLoading(true);
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = await UploadToCloudinary(file, "image");
        setSelectedImage(imageUrl);
        formik.setFieldValue("image", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("No file selected");
    }
  };
  const handleSelectVideo = async (event) => {
    setIsLoading(true);
    const file = event.target.files[0];
    if (file) {
      try {
        const videoUrl = await UploadToCloudinary(file, "video");
        setSelectedVideo(videoUrl);
        formik.setFieldValue("video", videoUrl);
      } catch (error) {
        console.error("Error uploading video:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("No file selected");
    }
  };

  const formik = useFormik({
    initialValues: {
      caption: "",
      image: "",
      video: "",
    },
    onSubmit: (values) => {
      closeModal(), dispatch(createPostAction(values));
    },
  });

  return (
    <div>
      <Modal
        open={openCreatePostModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div className="flex space-x-4 items-center">
                <Avatar />
                <div>
                  <p className="font-bold text-lg">Code with jhili</p>
                  <p className="text-sm">@codewithjhili</p>
                </div>
              </div>
              <textarea
                className="outline-none w-full mt-5 p-2 bg-transparent
              border border-[#3b4054] rounded-md"
                placeholder="write caption ..."
                name="caption"
                id=""
                onChange={formik.handleChange}
                value={formik.values.caption}
                rows="4"
              />
              <div className="flex items-center space-x-5 mt-5">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSelectImage}
                    style={{ display: "none" }}
                    id="image-input"
                  />
                  <label htmlFor="image-input">
                    <IconButton color="primary" component="span">
                      <ImageIcon />
                    </IconButton>
                  </label>
                  <span>Image</span>
                </div>
                <div>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleSelectVideo}
                    style={{ display: "none" }}
                    id="video-input"
                  />
                  <label htmlFor="video-input">
                    <IconButton color="primary">
                      <VideoCallIcon />
                    </IconButton>
                  </label>
                  <span>Video</span>
                </div>
              </div>
              {selectedImage && (
                <div>
                  <img className="h-[10rem]" src={selectedImage} alt="" />
                </div>
              )}
              <div className="flex w-full justify-end">
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ borderRadius: "1.5rem" }}
                >
                  Post
                </Button>
              </div>
            </div>
          </form>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            // onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
