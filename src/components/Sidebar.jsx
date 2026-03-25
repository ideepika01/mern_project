import react from "react";
import "../App.css"
import { SidebarData } from "./SidebarData"
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="Sidebar">
      <h2 style={{textAlign:"center"}}>Sentigram</h2>
      <ul className="SidebarList">{SidebarData.map((item, index) => {
        return (
          <li key={index} className="row" 
            onClick={() => navigate(item.link)}
          >
            <div id="icon">{item.icon}</div>
            <div id="title">{item.title}</div>
          </li>
        )
      })}
      </ul>
    </div>
  );
}
export default Sidebar;
