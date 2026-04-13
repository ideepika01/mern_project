import react from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeOutlinedIcon />,
    link: "/home",
  },
  {
    title: "Explore",
    icon: <ExploreOutlinedIcon />,
    link: "/explore",
  },
  {
    title: "Create",
    icon: <AddBoxOutlinedIcon />,
    link: "/create",
  },
  {
    title: "Messages",
    icon: <ChatOutlinedIcon />,
    link: "/messages",
  },
  {
    title: "Profile",
    icon: <AccountCircleOutlinedIcon />,
    link: "/profile",
  },
];
