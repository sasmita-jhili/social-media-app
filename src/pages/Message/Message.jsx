import {
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import WestIcon from "@mui/icons-material/West";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchUser from "../../components/SearchUser/SearchUser";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChats } from "../../redux/message/message.action";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { UploadToCloudinary } from "../../utils/UploadToCloudinary";
import SendIcon from "@mui/icons-material/Send";
import Stom from "stompjs";
import "../../components/init";
import SockJS from "sockjs-client";

const Message = () => {
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedImage, setselectedImage] = useState();
  const [loading, setLoading] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);
  const auth = useSelector((state) => state.auth);
  const chatContainerRef = useRef(null);

  const handleSelectImage = async (e) => {
    setLoading(true);
    const imgUrl = await UploadToCloudinary(e.target.files[0], "image");
    setselectedImage(imgUrl);
    setLoading(false);
    console.log("handle Select Image....");
  };
  const handleCreateMessage = () => {
    document.getElementById("input-value").value = "";
    const message = {
      chatId: currentChat?.id,
      content: inputValue,
      image: selectedImage,
    };
    dispatch(createMessage({ message, sendMessageToServer }));
  };

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  // useEffect(() => {
  //   setMessages([...messages, message.message]);
  // }, [message.message]);

  const [stompClient, setStompClient] = useState(null);
  useEffect(() => {
    const sock = new SockJS("http://localhost:9090/ws");
    const stomp = Stom.over(sock);
    setStompClient(stomp);
    stomp.connect({}, onConnect, onError);
  }, []);
  const onConnect = () => {
    console.log("websocket Connected ......");
  };
  const onError = (error) => {
    console.log("error .....", error);
  };
  useEffect(() => {
    if (stompClient && auth.user && currentChat) {
      const subscription = stompClient.subscribe(
        `/user/${currentChat.id}/private`,
        onMessageRecive
      );
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessageToServer = (newMessage) => {
    if (stompClient && newMessage) {
      stompClient.send(
        `/app/chat/${currentChat?.id.toString()}`,
        {},
        JSON.stringify(newMessage)
      );
    }
  };
  const onMessageRecive = (payload) => {
    const recivedMessage = JSON.parse(payload.body);
    console.log("message recivefrom websocket ", recivedMessage);
    setMessages([...messages, recivedMessage]);
  };

  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden p-4">
        <Grid className="px-5" item xs={3}>
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              <div className="flex space-x-4 items-center py-5">
                <WestIcon />
                <h1 className="text-xl font-bold">Home</h1>
              </div>
              <div className="h-[83vh]">
                <div className="">
                  <SearchUser />
                </div>
                <div className="h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar">
                  {message.chats && message.chats.length > 0 ? (
                    message.chats.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setCurrentChat(item);
                          setMessages(item.message);
                        }}
                      >
                        <UserChatCard chat={item} />
                      </div>
                    ))
                  ) : (
                    <p>No chats available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className="h-full" item xs={9}>
          {currentChat ? (
            <div>
              <div className="flex justify-between items-center border-1 p-5">
                <div className="flex items-center space-x-3 ">
                  <Avatar src="/image/userprofile.png" />
                  <p>
                    {auth.user.id === currentChat.users[0].id
                      ? currentChat.users[1].firstName +
                        " " +
                        currentChat.users[1].lastName
                      : currentChat.users[0].firstName +
                        " " +
                        currentChat.users[0].lastName}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <IconButton>
                    <AddIcCallIcon />
                  </IconButton>

                  <IconButton>
                    <VideoCallIcon />
                  </IconButton>
                </div>
              </div>
              <div ref={chatContainerRef} className="hideScrollbar overflow-y-scroll h-[82vh] px-5 space-y-5 py-12 mb-7">
                {messages ? (
                  messages.map((item, index) => (
                    <div key={index}>
                      <ChatMessage item={item} />
                    </div>
                  ))
                ) : (
                  <p></p>
                )}
              </div>
              <div className="sticky bottom-0 border-1">
                {selectedImage && (
                  <img
                    className="w-[5rem] h-[5rem] object-cover
                  px-2"
                    src={selectedImage}
                    alt=""
                  />
                )}
                {/* <div className="py-2 flex items-center justify-center space-x-2"> */}
                <div className="flex flex-row">
                  <div className="flex-1">
                  <input
                    className="bg-transparent border border-[#3b40544] rounded-full 
                    w-[90%] py-2 px-3"
                    placeholder="Type message ....."
                    type="text"
                    onChange={(e) => setinputValue(e.target.value)}
                    id="input-value"
                  />
                  </div>
                  <div className="flex-none w-14 ">
                <SendIcon onClick={handleCreateMessage} />
                </div>
                <div className="flex-none w-14 ">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSelectImage}
                      className="hidden"
                      id="image-input"
                    />
                    <label htmlFor="image-input">
                      <AddPhotoAlternateIcon />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="h-full space-y-5 flex flex-col justify-center
          items-center"
            >
              <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
              <p className="text-xl font-semibold">No Chat Selected</p>
            </div>
          )}
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Message;
