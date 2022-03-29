import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Aside, VideoCard } from "../../components";
import { VideoContext } from "../../context";
import "./VideoListing.css";
export function VideoListing() {
  const { state, videoClickHandler } = useContext(VideoContext);
  return (
    <div className="trend-video-grid-layout">
      <Aside />
      <main className="trend-main">
        <h2 className="trend-title">Trending Videos</h2>
        <div className="video-container">
          {state.allVideos.map((item) => (
            <Link key={item._id} onClick={()=>videoClickHandler(item)} to="/video">
              <VideoCard item={item} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
