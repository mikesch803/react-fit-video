import React from "react";
import { useEffect } from "react";
import { Aside, VideoCard } from "../../components";
import {  useVideo } from "../../context";
import { useCategory, useTitle, useVideoCardOption } from "../../hooks";
import "./Home.css";
export function Home() {
  useTitle("Homes");
  const {
    categoryHandler,
    setCateogoryVideos,
    categoryVideos,
    activeBtn,
  } = useCategory();
  const { state } = useVideo();
  useEffect(() => {
    setCateogoryVideos(state.allVideos);
  }, [state, setCateogoryVideos]);

  const { videoCardOptionState, setVideoCardOptionState } =
    useVideoCardOption();

  return (
    <div className="grid-layout ">
      <Aside />
      <div className="home-main">
        <div className="categories-btns">
          {state.categoryVideos.map((item) => (
            <button
            name={item.categoryName}
            key={item._id}
            className={`btn btn-outline btn-round ${
              activeBtn === item.categoryName ? "btn-active" : ""
            }`}
            onClick={(e) => {
              categoryHandler(item, e);
            }}
            >
              {item.categoryName}
            </button>
          ))}
        </div>
        <div className="video-container">
          {categoryVideos.map((item) => (
            <li key={item._id}>
              <VideoCard
                item={item}
                videoCardOptionState={videoCardOptionState}
                setVideoCardOptionState={setVideoCardOptionState}
                />
            </li>
          ))}
        </div>
      </div>   
    </div>
  );
}
