import React from "react";
import { Aside, VideoCard } from "../../components";
import { useVideo } from "../../context";
import { useTitle, useVideoCardOption } from "../../hooks";
import { filterVideos } from "../../utils/functions/filterVideos";
import "./VideoListing.css";
export function VideoListing() {
  const { videoCardOptionState, setVideoCardOptionState } =
    useVideoCardOption();
  const { state } = useVideo();
  useTitle("VideoListing")
  return (
    <div className="grid-layout">
    <>
      <Aside />
      <main className="trend-main">
        <h2 className="trend-title">Trending Videos</h2>
        <div className="video-container">
          {filterVideos(state).map((item) => (
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
