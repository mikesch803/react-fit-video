import React, { useState } from "react";
import "./VideoCard.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HistoryContext, VideoContext } from "../../context";
import { MoreOptionsIcon } from "../../icons/Icons";
import { StackListContainer } from "../index";
export function VideoCard({ item }) {
  const [videoCardOptionState, setVideoCardOptionState] = useState(false);
  const { videoClickHandler } = useContext(VideoContext);
  const {addVideoToHistoryHandler, historyVideos} = useContext(HistoryContext)
  const notVideoInHistory = !historyVideos.some(video => video._id === item._id)
  const navigate = useNavigate();
  return (
    <div className="card card-vrt">
      <div className="card-img-container">
        <img
          className="card-img"
          src={item.thumbnail}
          alt={item.alt}
          onClick={() => {
            videoClickHandler(item);
            navigate(`/video/${item._id}`);
            notVideoInHistory && addVideoToHistoryHandler(item);
          }}
        />
      </div>
      <div className="card-desc "
       >
        <div className="avatar avatar-ss">
          <img src={item.avatar} alt="avatar" className="circle-img" />
        </div>
        <div className="flex-1 m-l-1">
          <p>
            {item.title.length > 50
              ? item.title.substring(0, 51) + "..."
              : item.title}
          </p>
          <small>{item.creator}</small>
        </div>
        <div onClick={() => setVideoCardOptionState(!videoCardOptionState)} >
          <MoreOptionsIcon />
        </div>
      </div>
      {videoCardOptionState && <StackListContainer item={item} />}
    </div>
  );
}
