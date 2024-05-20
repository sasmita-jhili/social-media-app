import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import PostCard from "../../components/Post/PostCard";
import UserReelsCard from "../../components/Reels/UserReelsCard";

const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" },
];
const posts = [1, 1, 1, 1];
const reels = [1, 1, 1, 1];
const savedposts = [1, 1, 1, 1];
const Profile = () => {
  const { id } = useParams();
  const [value, setValue] = React.useState("post");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Card className="my-10 w-[80%]">
      <div className="h-[15rem]">
        <img
          className="w-full h-full rounded-t-md"
          src="https://cdn.pixabay.com/photo/2014/01/13/20/01/pebbles-243910_640.jpg"
        />
      </div>
      <div className="px-5 flex justify-between items-start mt-5 h-[5rem] ">
        <Avatar
          className="transform -translate-y-24"
          sx={{ width: "8rem", height: "8rem" }}
          src="https://i.pinimg.com/564x/7c/23/f1/7c23f1cca54300f18db2c9e3097aa596.jpg"
        />
        {true ? (
          <Button variant="outlined" sx={{ borderRadius: "20px" }}>
            Edit Profile
          </Button>
        ) : (
          <Button variant="outlined" sx={{ borderRadius: "20px" }}>
            Follow
          </Button>
        )}
      </div>
      <div className="pb-5 ml-5">
        <div>
          <h1 className="font-bold text-xl">Code with sasmita</h1>
          <p>@codewithsasmita</p>
        </div>
        <div className="flex gap-5 items-center py-3">
          <span>41 post</span>
          <span>35 followers</span>
          <span>5 followings</span>
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
      <section>
        <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="secondary tabs example"
          >
            {tabs.map((item) => (
              <Tab value={item.value} label={item.name} wrapped />
            ))}
          </Tabs>
        </Box>
        <div className="flex justify-center">
          {value === "post" ? (
            <div className="space-y-5 w-[70%] my-10">
              {posts.map((item) => (
                <div
                  className="border border-slate-100 
            rounded-md"
                >
                  <PostCard />
                </div>
              ))}
            </div>
          ) : value === "reels" ? (
            <div className=" flex justify-center flex-wrap gap-2 ">
              {reels.map((item) => (
                <UserReelsCard />
              ))}
            </div>
          ) :value === "saved" ? (
            <div className="space-y-5 w-[70%] my-10">
              {savedposts.map((item) => (
                <div
                  className="border border-slate-100 
            rounded-md"
                >
                  <PostCard />
                </div>
              ))}
            </div>
          ): (
           <div>Repost</div>
          )}
        </div>
      </section>
    </Card>
  );
};

export default Profile;
