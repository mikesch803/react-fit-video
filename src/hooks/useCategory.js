import { useState } from "react";
import { useVideo } from "../context";

export function useCategory() {
  const { state } = useVideo();
  const [categoryVideos, setCateogoryVideos] = useState([]);
  const [activeBtn, setActiveBtn] = useState("all");
  const categoryHandler = (item, e) => {
    let sortVideos = [...state.allVideos];
    setCateogoryVideos(
      sortVideos.filter((video) => video.categoryName === item.categoryName)
    );
    setActiveBtn(e.target.name);
  };

  const allVideosHandler = (e) => {
    setCateogoryVideos(state.allVideos);
    setActiveBtn(e.target.name);
  };

  return {
    categoryHandler,
    categoryVideos,
    setCateogoryVideos,
    allVideosHandler,
    activeBtn,
  };
}
