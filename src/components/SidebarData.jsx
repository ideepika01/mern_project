import react from "react"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const SidebarData = [
    {
        title: "Home",
        icon: <HomeOutlinedIcon />,
        link: "/home"
    },
    {
        title: "Explore",
        icon: <ExploreOutlinedIcon />,
        link: "/explore"
    },
    {
        title: "Messages",
        icon: <ChatBubbleOutlineOutlinedIcon />,
        link: "/messages"
    },
    {
        title: "Profile",
        icon: <AccountCircleOutlinedIcon />,
        link: "/profile"
    },
    {
        title: "Create",
        icon: <AddBoxOutlinedIcon />,
        link: "/create"
    }
]