import react from "react"
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Badge, Avatar } from '@mui/material';

function Navbar() {
    return (
        <div className="Navbar">
            <input
                type="text"
                placeholder="Search Sentigram..."
                style={{
                    width: "40%",
                    height: "40px",
                    borderRadius: "20px",
                    border: "1px solid #ccc",
                    paddingLeft: "15px",
                    outline: "none"
                }}
            />
            <div className="icons">
                <Badge color="error" variant="dot" overlap="circular">
                    <NotificationsNoneOutlinedIcon style={{ cursor: "pointer", color: "#333" }} />
                </Badge>
                <Avatar
                    alt="User Profile"
                    src="https://mui.com/static/images/avatar/1.jpg"
                    style={{ width: 35, height: 35, cursor: "pointer" }}
                />
            </div>
        </div>
    )
}
export default Navbar
