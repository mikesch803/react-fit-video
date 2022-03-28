import React from "react";
import { useContext } from "react";
import { Aside, VideoCard } from "../../components";
import { VideoContext } from "../../context";
import "./VideoListing.css";
export function VideoListing() {
  const { state } = useContext(VideoContext);
  return (
    <div className="trend-video-grid-layout">
      <Aside />
      <main className="trend-main">
        <h2 className="trend-title">Trending Videos</h2>
        <div className="video-container">
          {state.allVideos.map((item) => (
            <li key={item._id}>
              <VideoCard item={item} />
            </li>
          ))}
        </div>
      </main>
    </div>
  );
}
