import React from "react";
import { NavLink } from "react-router-dom";
import { asideData } from "../../data/aside.data";
import './NavbarBottom.css';
export function NavbarBottom() {
  const NavLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? `` : "black",
    };
  };
  return (
      <div className="navbar-bottom">
        <div className="navbar-bottom-icons">
        {asideData.map((link, index) => (
          <NavLink style={NavLinkStyles} to={link.to} className={NavLinkStyles?'btn btn-link':'btn'} key={index}>
            <span>{link.icon}</span>
          </NavLink>
        ))}
      </div>
      </div>
  );
}