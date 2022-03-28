import React from "react";
import { NavLink } from "react-router-dom";
import { asideData } from "../../data/aside.data";
import "./Aside.css";
export function Aside() {
 
  return (
    <aside className="aside">
      <div className="sidebar">
        {asideData.map((link,index) => 
          (
            <NavLink to={link.to} className="btn-link" key={index}>
              <span className="aside-icons">
                {link.icon}
              </span>
              {link.text}
            </NavLink>
          )
        )}
      </div>
    </aside>
  );
}
