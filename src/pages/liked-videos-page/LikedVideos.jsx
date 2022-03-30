import React from "react";
import "./LikedVideos.css";
import { useContext } from "react";
import { Aside, VideoCard } from "../../components";
import axios from "axios";
import { useEffect } from "react";
import { LikeVideoContext } from "../../context";

export function LikedVideos() {
  const { likeVideos, setLikeVideos } = useContext(LikeVideoContext);
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
          setLikeVideos(response.data.likes);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [encodedToken, setLikeVideos]);
  return (
    <div className="liked-video-grid-layout">
      <Aside />
      <main className="liked-video-main">
        <h2 className="liked-video-title">Liked Videos</h2>
        <div className="video-container">
          {likeVideos.map((item) => (
            <li key={item._id}>
              <VideoCard item={item} />
            </li>
          ))}
        </div>
      </main>
    </div>
  );
}
