import { useContext } from "react";
import {
  HistoryContext,
  LikedVideoContext,
  WatchLaterContext,
} from "../../context";
import {
  ThumbsDownIcon,
  ThumbsUpIcon,
  WatchLaterIcon,
} from "../../icons/Icons";
import "./StackListContainer.css";

export const StackListContainer = ({ item }) => {
  const { addToLikedVideoHandler, removeFromLikedVideoHandler, likedVideos } =
    useContext(LikedVideoContext);

  const {
    addVideoToWatchLaterHandler,
    removeVideoFromWatchLaterHandler,
    watchLaterVideos,
  } = useContext(WatchLaterContext);

  const { historyVideos, removeVideoFromHistoryHandler } =
    useContext(HistoryContext);

  return (
    <div className="stack-list-container position-stack">
      <ul>
        {watchLaterVideos.findIndex((video) => video._id === item._id) !==
        -1 ? (
          <li
            className="btn btn-link"
            onClick={() => removeVideoFromWatchLaterHandler(item)}
          >
            <span className="m-r-span">
              <WatchLaterIcon />
            </span>
            Remove from watch later
          </li>
        ) : (
          <li
            className="btn btn-link"
            onClick={() => addVideoToWatchLaterHandler(item)}
          >
            <span className="m-r-span">
              <WatchLaterIcon />
            </span>
            Add to watch later
          </li>
        )}
        {likedVideos.findIndex((video) => video._id === item._id) !== -1 ? (
          <li
            className="btn btn-link"
            onClick={() => removeFromLikedVideoHandler(item)}
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
        {historyVideos.includes(item) && (
          <li
            className="btn btn-link"
            onClick={() => removeVideoFromHistoryHandler(item)}
          >
            <span className="m-r-span">&times;</span>Remove from history
          </li>
        )}
      </ul>
    </div>
  );
};
