import React, { useContext } from "react";
import { useEffect } from "react";
import { Aside, VideoCard } from "../../components";
import { VideoContext } from "../../context";
import { useCategory } from "../../hooks/useCategory";
import "./Home.css";
export function Home() {
  const { categoryHandler, setCateogoryVideos, categoryVideos } = useCategory();

  const allVideosHandler = () => setCateogoryVideos(state.allVideos);

  const { state } = useContext(VideoContext);

  useEffect(() => {
    setCateogoryVideos(state.allVideos);
  }, [state, setCateogoryVideos]);

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
