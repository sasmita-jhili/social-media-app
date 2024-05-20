import React from "react";
import { navigationMenu } from "./SidebarNavigation";
import Divider from "@mui/material/Divider";
import { Avatar, Button, Card, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const Sidebar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card
      className="card h-screen flex flex-col justify-between
    py-5"
    >
      <div className="space-y-5 pl-5">
        <div className="">
          <span className="font-bold text-xl">Social Media</span>
        </div>
        <div className="space-y-6">
          {navigationMenu.map((item) => (
            <div className="cursor-pointer flex space-x-3 items-center">
              {item.icon}
              <p className="text-l">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Divider />
        <div
          className="pl-2 flex items-center justify-between
        pt-4"
        >
          <div className="flex items-center space-x-3">
            <Avatar src="./image/avatar.png" />
            <div>
              <p className="font-semibold">Code With sasmita</p>
              <p className="opacity-70">@codewithsasmita</p>
            </div>
          </div>
          <div>
            <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;