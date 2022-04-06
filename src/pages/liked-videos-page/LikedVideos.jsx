import React from "react";
import "./LikedVideos.css";
import { Aside, VideoCard } from "../../components";
import axios from "axios";
import { useEffect } from "react";
import { useLikedVideo } from "../../context";

export function LikedVideos() {
  const { likedVideos, setLikedVideos } = useLikedVideo();
  const encodedToken = localStorage.getItem("token");
  useEffect(() => {
    // if(encodedToken){
      (async () => {
      try {
        const response = await axios.get("/api/user/likes", {
          headers: {
            authorization: encodedToken,
          },
        });
        if (response.status === 200) {
          setLikedVideos(response.data.likes);
          console.log(response)
        }
      } catch (err) {
        console.error(err);
      }
    })();
  // }
  }, [encodedToken, setLikedVideos]);
  return (
    <div className="liked-video-grid-layout">
      <Aside />
      <main className="liked-video-main">
        <h2 className="liked-video-title">Liked Videos</h2>
        <div className="video-container">
          {likedVideos.map((item) => (
            <li key={item._id}>
              <VideoCard item={item} />
            </li>
          ))}
        </div>
      </main>
    </div>
  );
}
