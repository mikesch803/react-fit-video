import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useVideo } from "../../context";
import { SearchIcon, UserIcon } from "../../icons/Icons";
import "./Header.css";
export function Header() {
  const { dispatch } = useVideo();
  const navigate = useNavigate();
  const searchVideoHandler = (e) => {
     navigate('/trend')
    dispatch({ type: "SEARCH_VIDEO", payload: e.target.value })
  };

  return (
    <div className="navbar">
      <h1 className="navbar-title">
        <Link to="/">Fit Video</Link>
      </h1>
      <div className="navbar-search">
        <input
          className="navbar-input"
          placeholder="search videos..."
          onChange={e => searchVideoHandler(e)}
        />
        <SearchIcon />
      </div>
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
