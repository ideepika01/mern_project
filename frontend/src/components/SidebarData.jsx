import react from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

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
    title: "Notifications",
    icon: <NotificationsNoneOutlinedIcon />,
    link: "/notifications",
  },
  {
    title: "Messages",
    icon: <ChatBubbleOutlineOutlinedIcon />,
    link: "/messages",
  },
  {
    title: "Create",
    icon: <AddBoxOutlinedIcon />,
    link: "/create",
  },
  {
    title: "Profile",
    icon: <AccountCircleOutlinedIcon />,
    link: "/profile",
  },
  {
    title: "Settings",
    icon: <SettingsOutlinedIcon />,
    link: "/settings",
  },
];

