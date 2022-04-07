import "./StackListContainer.css";
import { useHistory, useLikedVideo, useWatchLater } from "../../context";
import {
  ThumbsDownIcon,
  ThumbsUpIcon,
  WatchLaterIcon,
} from "../../icons/Icons";
import { checkLikedVideo, checkWatchLater } from "../../utils/functions";

export const StackListContainer = ({ item }) => {
  const { addToLikedVideoHandler, removeFromLikedVideoHandler, likedVideos } =
    useLikedVideo();

  const {
    addVideoToWatchLaterHandler,
    removeVideoFromWatchLaterHandler,
    watchLaterVideos,
  } = useWatchLater();

  const { historyVideos, removeVideoFromHistoryHandler } = useHistory();

  return (
    <div className="stack-list-container position-stack">
      <ul>
        {checkWatchLater(item, watchLaterVideos) ? (
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
        {checkLikedVideo(item, likedVideos) ? (
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
