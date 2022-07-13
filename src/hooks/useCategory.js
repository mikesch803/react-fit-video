import { useState } from "react";

export function useCategory() {
  const [categoryVideos, setCateogoryVideos] = useState([]);
  const [activeBtn, setActiveBtn] = useState("all");
  const categoryHandler = (e) => {
    setActiveBtn(e.target.name);
  };

  return {
    categoryHandler,
    categoryVideos,
    setCateogoryVideos,
    activeBtn,
  };
}
