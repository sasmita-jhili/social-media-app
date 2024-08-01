import React from "react";
// import SerachUser from "../SerachUser/SerachUser";
import PopularUserCard from "./PopularUserCard";
import { Card } from "@mui/material";

const HomeRight = () => {
  const popularUser = [1, 1, 1, 1, 1];
  return (
    <div className="ml-3">
      {/* <SerachUser /> */}
      <Card className="py-3">
        <div className="flex justify-between p-5 items-center">
          <p className="font-semibold opacity-70">Suggestions for you</p>
          <p className="text-xs font-semibold opacity-95">View All</p>
        </div>
        <div className="">
          {popularUser.map(()=><PopularUserCard key={1} />)}
          
        </div>
      </Card>
    </div>
  );
};

export default HomeRight;
