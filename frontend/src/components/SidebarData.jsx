import react from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
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
    title: "Create",
    icon: <AddBoxOutlinedIcon />,
    link: "/create",
  },
  {
    title: "Notifications",
    icon: <NotificationsNoneOutlinedIcon />,
    link: "/notifications",
  },
  {
    title: "Profile",
    icon: <AccountCircleOutlinedIcon />,
    link: "/profile",
  },
];
