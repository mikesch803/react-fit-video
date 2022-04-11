import React from "react";
import "./History.css";
import { Aside, VideoCard } from "../../components";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "../../context";
import { useVideoCardOption } from "../../hooks";

export function History() {
  const { videoCardOptionState, setVideoCardOptionState } =
    useVideoCardOption();
  const { historyVideos, setHistoryVideos, clearHistoryHandler } = useHistory();
  const encodedToken = localStorage.getItem("token");
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/user/history", {
          headers: {
            authorization: encodedToken,
          },
        });
        if (response.status === 200) {
          setHistoryVideos(response.data.history);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [encodedToken, setHistoryVideos]);
  return (
    <div className="grid-layout">
      <Aside />
      <main className="history-video-main">
        <h2 className="history-video-title">
          History Videos
          <span
            className="btn btn-ss btn-outline m-l-auto"
            onClick={clearHistoryHandler}
          >
            clear
          </span>
        </h2>
        <div className="video-container">
          {historyVideos.map((item) => (
            <li key={item._id} className="history-list">
              <VideoCard item={item} videoCardOptionState={videoCardOptionState} setVideoCardOptionState={setVideoCardOptionState}/>
            </li>
          ))}
        </div>
      </main>
    </div>
  );
}
