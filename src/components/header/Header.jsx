import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
export function Header() {
  return (
      <div className="navbar">
        <h1 className="navbar-title">
          <Link to="/" >
            Fit Video
          </Link>
        </h1>
        <div className="navbar-icons">
          <Link to="/login" className="btn btn-link navbar-login">
            login
          </Link>
          <Link to="/trend" className="btn btn-link navbar-shop">
            Trend
          </Link>          
        </div>
      </div>
  );
}
