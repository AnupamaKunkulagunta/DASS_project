import React, {useState} from 'react'
import { RiMenuLine } from "react-icons/ri";
import HUD from "./HUD";

export default function SwarmMenu({vectorSource}) {
    const handleToggler = () => {
        if (isExpanded) {
           setIsExpanded(false);
           localStorage.setItem("sidebar-collapsed", true);
           return;
        }
        setIsExpanded(true);
        localStorage.removeItem("sidebar-collapsed");
     };

    const sidebarCollapsed = localStorage.getItem("sidebar-collapsed");
    const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true);
  
    return (
    <>
        <div className={isExpanded ? "Sidebar" : "Sidebar collapsed"}>
            <div className="Sidebar-header">
                <RiMenuLine className="Sidebar-icon" onClick={handleToggler} />
            </div>

            <div className="sidebar-text">
                <HUD source={vectorSource} />
            </div>

        </div>
    </>
  )
}
