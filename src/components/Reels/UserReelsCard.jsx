import React from "react";

const UserReelsCard = () => {
  return (
    <div className="w-[15rem] px-2">
      <video
      controls
        className="w-full h-full"
        src="https://videos.pexels.com/video-files/4040354/4040354-sd_540_960_30fps.mp4"
      />
    </div>
  );
};

export default UserReelsCard;
