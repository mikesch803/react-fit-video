import React, { useState, useContext } from "react";
import { Aside, VideoCard } from "../../components";
import { VideoContext } from "../../context";
import "./Home.css";
export function Home() {
  const { state } = useContext(VideoContext);

  const [categoryVideos, setCateogoryVideos] = useState([...state.allVideos]);

  const categoryHandler = (item) => {
    let sortVideos = [...state.allVideos];
    setCateogoryVideos(
      sortVideos.filter((video) => video.categoryName === item.categoryName)
    );
  };

  const allVideosHandler = () => setCateogoryVideos(state.allVideos);

  return (
    <div className="home-grid-layout">
      <Aside />
      <div className="home-main">
        <button
          className="btn btn-outline  btn-round"
          onClick={allVideosHandler}
        >
          All
        </button>
        {state.categoryVideos.map((item) => (
          <button
            key={item._id}
            className="btn btn-outline  btn-round"
            onClick={() => categoryHandler(item)}
          >
            {item.categoryName}
          </button>
        ))}
        <div className="video-container">
          {categoryVideos.map((item) => (
            <li key={item._id}>
              <VideoCard item={item} />
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
