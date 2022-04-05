import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Aside, VideoCard } from "../../components";
import { VideoContext } from "../../context";
import { useCategory } from "../../hooks/useCategory";
import "./Home.css";
export function Home() {
  const { categoryHandler, setCateogoryVideos, categoryVideos } = useCategory();
  const allVideosHandler = () => setCateogoryVideos(state.allVideos);
  const { state } = useContext(VideoContext);
const [activeBtn, setActiveBtn] = useState("all")
  useEffect(() => {
    setCateogoryVideos(state.allVideos);
  }, [state, setCateogoryVideos]);


  return (
    <div className="home-grid-layout">
      <Aside />
      <div className="home-main">
        <button
          name="all"
          className={`btn btn-outline btn-round ${activeBtn === "all"? "btn-active" : ""}`}
          onClick={(e)=>{allVideosHandler(); setActiveBtn(e.target.name);}}
        >
          All
        </button>
        {state.categoryVideos.map((item) => (
          <button
            name={item.categoryName}
            key={item._id}
            className={`btn btn-outline btn-round ${activeBtn === item.categoryName ? "btn-active" : ""}`}
            onClick={(e) => { categoryHandler(item); setActiveBtn(e.target.name) }}
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
