import React from "react";
import { useSelector } from "react-redux";

const ChatMessage = ({ item }) => {
  const auth = useSelector((state) => state.auth);

  const isReqUserMessage = auth?.user?.id === item?.user?.id;
  const isImage = item?.image ? true : false;
  return (
    <div
      className={`flex ${
        isReqUserMessage ? "justify-start" : "justify-end"
      } text-white `}
    >
      <div
        className={`bg-[#191c29] p-1
        ${isImage ? "rounded-md" : " px-5 rounded-full"} `}
      >
        {isImage && (
          <img
            className="w-[12rem] h-[17rem] object-cover rounded-md "
            alt=""
            src={item.image}
          />
        )}
        <p className={`${true ? "py-2" : "py-1"}`}>{item?.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
