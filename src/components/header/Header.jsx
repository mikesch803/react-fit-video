import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useVideo } from "../../context";
import { SearchIcon, UserIcon } from "../../icons/Icons";
import { debounce } from "../../utils/functions";
import "./Header.css";
export function Header() {
  const [searchText, setSearchText] = useState("");
  const { dispatch } = useVideo();
  const searchVideoHandler = () => {
    dispatch({ type: "SEARCH_VIDEO", payload: searchText });
  };

  const debounceFunc = debounce(searchVideoHandler, 1500);

  useEffect(() => {
    debounceFunc();
  }, [searchText]);

  return (
    <div className="navbar">
      <h1 className="navbar-title">
        <Link to="/">Fit Video</Link>
      </h1>
      <div className="navbar-search">
        <input
          className="navbar-input"
          placeholder="search videos..."
          onChange={(e) => setSearchText(e.target.value)}
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
