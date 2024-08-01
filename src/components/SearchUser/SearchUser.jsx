import { Avatar, Card, CardHeader } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../redux/Auth/auth.action";
import { createChat } from "../../redux/message/message.action";

const SearchUser = () => {
  const [userName, setUserName] = useState("");

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleSearchUser = (e) => {
    setUserName(e.target.value);
    if (jwt) {
      dispatch(searchUserAction(userName, jwt));
    }
  };

  const handleClick = (id) => {
  dispatch(createChat({userId:id}))
  };
  return (
    <div>
      <div className="py-5 relative">
        <input
          className="bg-transparent border border-[#3b4054]
        outline-none w-full px-5 py-3 rounded-full"
          placeholder="search user...
        "
          onChange={handleSearchUser}
          type="text"
        />
        {userName &&
          auth.searchuser.map((item) => (
            <Card
              key={item.id}
              className="absolute w-full z-10 top-[4.5rem] cursor-pointer"
            >
              <CardHeader
                onClick={() => {
                  handleClick(item.id);
                  setUserName("");
                }}
                avatar={<Avatar src="/image/flower.jpg" />}
                title={item.firstName + " " + item.lastName}
                subheader={
                  item.firstName.toLowerCase() +
                  " " +
                  item.lastName.toLowerCase()
                }
              />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default SearchUser;
