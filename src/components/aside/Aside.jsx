import React from "react";
import {
  HistoryIcon,
  HomeIcon,
  LikedIcon,
  TrendIcon,
  WatchLaterIcon,
} from "../../icons/Icons";
import "./Aside.css";
export default function Aside() {
  return (
    <aside className="aside">
      <h2>
        <span className="aside-icons" >
          <HomeIcon />
        </span>
        Home
      </h2>
      <h2>
        <span className="aside-icons">
          <TrendIcon />
        </span>
        Trend
      </h2>
      <h2>
        <span className="aside-icons">
          <HistoryIcon />
        </span>
        History
      </h2>
      <h2>
        <span className="aside-icons">
          <WatchLaterIcon />
        </span>
        Watch later
      </h2>
      <h2>
        <span className="aside-icons">
          <LikedIcon />
        </span>
        Liked videos
      </h2>
    </aside>
  );
}
