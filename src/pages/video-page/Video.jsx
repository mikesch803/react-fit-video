import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Aside, VideoCard } from "../../components";
import { VideoContext } from "../../context";
import { LikeVideoContext } from "../../context/like-video-context";
import {
  PlaylistIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  WatchLaterIcon,
} from "../../icons/Icons";
import "./Video.css";
export function Video() {
  const { state } = useContext(VideoContext);
  const cateoryVideos = state.allVideos.filter(
    (item) => item.categoryName === state.currentVideo.categoryName
  );
  const mustWatchVideos = cateoryVideos.filter(
    (item) => item._id !== state.currentVideo._id
  );

  const { addToLikedVideoHandler, removeFromLikeVideoHandler, likeVideos } = useContext(LikeVideoContext);

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
          <span onClick={() => addToLikedVideoHandler(state.currentVideo)}>
            <span>
              <ThumbsUpIcon />
            </span>
            Like
          </span>
          <span onClick={()=> removeFromLikeVideoHandler(state.currentVideo)}>
            <span >
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
            <li key={item._id}>
              <VideoCard item={item} />
            </li>
          ))}
        </div>
      </aside>
    </div>
  );
}
