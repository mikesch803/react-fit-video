import React from "react";
import { Aside, VideoCard } from "../../components";
import { useVideo } from "../../context";
import { useVideoCardOption } from "../../hooks";
import "./VideoListing.css";
export function VideoListing() {
  const { videoCardOptionState, setVideoCardOptionState } =
    useVideoCardOption();
  const { state } = useVideo();
  return (
    <div className="grid-layout">
    <>
      <Aside />
      <main className="trend-main">
        <h2 className="trend-title">Trending Videos</h2>
        <div className="video-container">
          {state.allVideos.map((item) => (
            <li key={item._id}>
              <VideoCard
                item={item}
                videoCardOptionState={videoCardOptionState}
                setVideoCardOptionState={setVideoCardOptionState}
                />
            </li>
          ))}
        </div>
      </main>
      </>
    </div>
  );
}
