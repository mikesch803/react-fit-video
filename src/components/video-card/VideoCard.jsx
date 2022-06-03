import React from "react";
import "./VideoCard.css";
import { useNavigate } from "react-router-dom";
import { useHistory, useVideo } from "../../context";
import { MoreOptionsIcon } from "../../icons/Icons";
import { StackListContainer } from "../index";
import { checkNotInHistroy } from "../../utils/functions";
export function VideoCard({
  item,
  setVideoCardOptionState,
  videoCardOptionState,
}) {
  const { addVideoToHistoryHandler, historyVideos } = useHistory();

  const navigate = useNavigate();
  return (
    <div className="card card-vrt">
      <div className="card-img-container">
        <img
          className="card-img"
          src={item.thumbnail}
          alt={item.alt}
          onClick={() => {
            navigate(`/video/${item._id}`);
            checkNotInHistroy(historyVideos, item) &&
              addVideoToHistoryHandler(item);
          }}
        />
      </div>
      <div className="card-desc ">
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
        <div
          onClick={(e) => {
            e.stopPropagation();
            setVideoCardOptionState((prev) =>
              prev === item._id ? "" : item._id
            );
          }}
        >
          <MoreOptionsIcon />
        </div>
      </div>
      {videoCardOptionState === item._id && <StackListContainer item={item} />}
    </div>
  );
}
