import React from "react";
import { NavLink } from "react-router-dom";
import { asideData } from "../../data/aside.data";
import "./Aside.css";
export function Aside() {
  const NavLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? `` : "black",
    };
  };

  return (
    <aside className="aside">
      <div className="sidebar">
        {asideData.map((link, index) => (
          <NavLink style={NavLinkStyles} to={link.to} className={NavLinkStyles?'btn btn-link':'btn'} key={index}>
            <span className="aside-icons">{link.icon}</span>
            {link.text}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
