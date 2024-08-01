import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { updateUserProfileAction } from "../../redux/Auth/auth.action";
import { Avatar, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const EditProfileModal = ({ openModal, closeModal, auth }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    outline: "none",
    overflow: "scroll-y",
    borderRadius: 3,
  };

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: auth.user?.firstName,
      lastName: auth.user?.lastName,
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(updateUserProfileAction(values));
    //   closeModal()
    },
  });
  return (
    <div>
      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={closeModal}>
                  <CloseIcon />
                </IconButton>
                <p>Edit Profile</p>
              </div>
              <Button type="submit">Save</Button>
            </div>
            <div>
              <div className="h-[15rem]">
                <img
                  className="w-full h-full rounded-t-md"
                  src="https://cdn.pixabay.com/photo/2014/01/13/20/01/pebbles-243910_640.jpg"
                  alt=""
                />
              </div>
              <div className="pl-5 ">
                <Avatar
                  className="transform -translate-y-12 "
                  sx={{ width: "6rem", heigt: "6rem" }}
                  src="https://i.pinimg.com/564x/7c/23/f1/7c23f1cca54300f18db2c9e3097aa596.jpg"
                />
              </div>
            </div>
            <div className="space-y-3">
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default EditProfileModal;
