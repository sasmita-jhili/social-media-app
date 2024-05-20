import { Avatar } from "@mui/material";
import React from "react";

const StoryCircle = () => {
  return (
    <div className="flex flex-col items-center mr-4 cursor-pointer">
      <Avatar
        sx={{ width: "4rem", height: "4rem" }}
        src="https://cdn.pixabay.com/photo/2017/03/17/04/07/woman-2150881_1280.jpg"
      ></Avatar>
      <p className="text-sm">codeWith</p>
    </div>
  );
};

export default StoryCircle;
