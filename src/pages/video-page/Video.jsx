import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Aside, VideoCard } from "../../components";
import { VideoContext } from "../../context";
import {
  PlaylistIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  WatchLaterIcon,
} from "../../icons/Icons";
import "./Video.css";
export function Video() {
  const { state, videoClickHandler } = useContext(VideoContext);
  const cateoryVideos = state.allVideos.filter(
    (item) => item.categoryName === state.currentVideo.categoryName
  );
  const mustWatchVideos = cateoryVideos.filter(
    (item) => item._id !== state.currentVideo._id
  );

  return (
    <div className="video-grid-layout">
      <Aside />
      <main className="video-main">
        <h2 className="video-title">{state.currentVideo.title}</h2>
        <iframe
          className="video-frame"
          frameBorder="0"
          allow="autoplay"
          title={state.currentVideo.title}
          src={`https://www.youtube.com/embed/${state.currentVideo.src}?autoplay=1`}
        />
        <div className="video-btns">
          <span>
            <span>
              <ThumbsUpIcon />
            </span>{" "}
            Like
          </span>
          <span>
            <span>
              <ThumbsDownIcon />
            </span>
            Unlike
          </span>
          <span>
            <span>
              <WatchLaterIcon />
            </span>
            Add to watch later
          </span>
          <span>
            <span>
              <PlaylistIcon />
            </span>
            Add to playlist
          </span>
        </div>
      </main>
      <aside className="video-aside">
        <h2 className="video-title">Must watch</h2>
        <div className="video-container">
          {mustWatchVideos.map((item) => (
            <Link
              key={item._id}
              to="/video"
              onClick={() => videoClickHandler(item)}
            >
              <VideoCard item={item} />
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}
