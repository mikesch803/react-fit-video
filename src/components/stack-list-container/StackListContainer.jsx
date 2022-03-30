import { useContext } from "react";
import { LikeVideoContext } from "../../context";
import {
  ThumbsDownIcon,
  ThumbsUpIcon,
  WatchLaterIcon,
} from "../../icons/Icons";
import "./StackListContainer.css";

export const StackListContainer = ({ item }) => {
  const { addToLikedVideoHandler, removeFromLikeVideoHandler, likeVideos } =
    useContext(LikeVideoContext);
  return (
    <div className="stack-list-container position-stack">
      <ul>
        <li className="btn btn-link">
          <span className="m-r-span">
            <WatchLaterIcon />
          </span>
          Add to watch later
        </li>
        {likeVideos.findIndex((video) => video._id === item._id) !== -1 ? (
          <li
            className="btn btn-link"
            onClick={() => removeFromLikeVideoHandler(item)}
          >
            <span className="m-r-span">
              <ThumbsDownIcon />
            </span>
            dislike video
          </li>
        ) : (
          <li
            className="btn btn-link"
            onClick={() => addToLikedVideoHandler(item)}
          >
            <span className="m-r-span">
              <ThumbsUpIcon />
            </span>
            Like video
          </li>
        )}
      </ul>
    </div>
  );
};
