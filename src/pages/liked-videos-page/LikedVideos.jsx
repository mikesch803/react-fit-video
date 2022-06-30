import React from "react";
import "./LikedVideos.css";
import { Aside, VideoCard } from "../../components";
import axios from "axios";
import { useEffect } from "react";
import { useLikedVideo } from "../../context";
import { useTitle, useVideoCardOption } from "../../hooks";

export function LikedVideos() {
  useTitle("LikedVideo")
  const { videoCardOptionState, setVideoCardOptionState } =
    useVideoCardOption();
  const { likedVideos, setLikedVideos } = useLikedVideo();
  const encodedToken = localStorage.getItem("token");
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/user/likes", {
          headers: {
            authorization: encodedToken,
          },
        });
        if (response.status === 200) {
          setLikedVideos(response.data.likes);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [encodedToken, setLikedVideos]);
  return (
    <div className="grid-layout">
      <Aside />
      {likedVideos.length === 0 ? <div className="center-text ft-grey ft-w-900">Please like some videos...</div> :
      <main className="liked-video-main">
        <h2 className="liked-video-title">Liked Videos</h2>
        <div className="video-container">
          {likedVideos.map((item) => (
            <li key={item._id}>
              <VideoCard item={item} videoCardOptionState={videoCardOptionState}
                setVideoCardOptionState={setVideoCardOptionState}/>
            </li>
          ))}
        </div>
      </main>}
    </div>
  );
}
