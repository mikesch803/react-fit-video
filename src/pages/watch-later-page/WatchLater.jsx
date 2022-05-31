import React from "react";
import "./WatchLater.css";
import { Aside, VideoCard } from "../../components";
import axios from "axios";
import { useEffect } from "react";
import { useWatchLater } from "../../context";
import { useTitle, useVideoCardOption } from "../../hooks";

export function WatchLater() {
  useTitle("Watch Later")
  const { videoCardOptionState, setVideoCardOptionState } =
    useVideoCardOption();
  const { watchLaterVideos, setWatchLaterVideos } =
    useWatchLater();
  const encodedToken = localStorage.getItem("token");
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/user/watchlater", {
          headers: {
            authorization: encodedToken,
          },
        });
        if (response.status === 200) {
          setWatchLaterVideos(response.data.watchlater);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [encodedToken, setWatchLaterVideos]);
  return (
    <div className="grid-layout">
      <Aside />
      <main className="watch-later-video-main">
        <h2 className="watch-later-video-title">Watch Later Videos</h2>
        <div className="video-container">
          {watchLaterVideos.map((item) => (
            <li key={item._id}>
              <VideoCard item={item} videoCardOptionState={videoCardOptionState} setVideoCardOptionState={setVideoCardOptionState}/>
            </li>
          ))}
        </div>
      </main>
    </div>
  );
}
