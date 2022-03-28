import React from "react";
import { NavLink } from "react-router-dom";
import {
  HistoryIcon,
  HomeIcon,
  LikedIcon,
  PlaylistIcon,
  TrendIcon,
  WatchLaterIcon,
} from "../../icons/Icons";
import "./Aside.css";
export function Aside() {
  return (
    <aside className="aside">
      <div className="sidebar">
        <NavLink to="/" className="btn-link">
          <span className="aside-icons">
            <HomeIcon />
          </span>
          Home
        </NavLink>
        <NavLink to="/trend" className="btn-link">
          <span className="aside-icons">
            <TrendIcon />
          </span>
          Trend
        </NavLink>
        <NavLink to="/history" className="btn-link">
          <span className="aside-icons">
            <HistoryIcon />
          </span>
          History
        </NavLink>
        <NavLink to="/watchlater" className="btn-link">
          <span className="aside-icons">
            <WatchLaterIcon />
          </span>
          Watch later
        </NavLink>
        <NavLink to="/likedvideos" className="btn-link">
          <span className="aside-icons">
            <LikedIcon />
          </span>
          Liked videos
        </NavLink>
        <NavLink to="/playlist" className="btn-link">
          <span className="aside-icons">
            <PlaylistIcon />
          </span>
          Playlist
        </NavLink>
      </div>
    </aside>
  );
}
