import React from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "../../icons/Icons";
import "./Header.css";
export function Header() {

  return (
    <div className="navbar">
      <h1 className="navbar-title">
        <Link to="/">Fit Video</Link>
      </h1>
      <div className="navbar-icons">
        <button className="btn btn-link navbar-login">
          <Link to="/profile" className="btn btn-link navbar-login">
            <UserIcon />
          </Link>
        </button>
      </div>
    </div>
  );
}
