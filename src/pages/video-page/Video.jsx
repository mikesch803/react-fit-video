import React from "react";
import "./Video.css";
import { Aside, PlaylistModal, VideoCard } from "../../components";
import { useLikedVideo, useVideo, useWatchLater } from "../../context";
import { PlaylistIcon, ThumbsUpIcon, WatchLaterIcon } from "../../icons/Icons";
import {
  mustWatchVideos,
  checkLikedVideo,
  checkWatchLater,
} from "../../utils/functions";
import { usePlaylistModal, useTitle } from "../../hooks";
export function Video() {
  const { state } = useVideo();
  
  const { addToLikedVideoHandler, removeFromLikedVideoHandler, likedVideos } =
  useLikedVideo();
  
  const {
    addVideoToWatchLaterHandler,
    removeVideoFromWatchLaterHandler,
    watchLaterVideos,
  } = useWatchLater();
  
  const { savePlaylistModal, setSavePlaylistModal } = usePlaylistModal();
  
  useTitle("Video")
  return (
    <>
      <div
        className={
          savePlaylistModal ? `video-grid-layout gray` : `video-grid-layout`
        }
      >
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
            {checkLikedVideo(state.currentVideo, likedVideos) ? (
              <button
                className={
                  checkLikedVideo(state.currentVideo, likedVideos) ? " btn-fill" : ""
                }
                onClick={() => removeFromLikedVideoHandler(state.currentVideo)}
              >
                <span>
                  <ThumbsUpIcon />
                </span>
                Liked
              </button>
            ) : (
              <button
                onClick={() => addToLikedVideoHandler(state.currentVideo)}
              >
                <span>
                  <ThumbsUpIcon />
                </span>
                Like
              </button>
            )}
            {checkWatchLater(state.currentVideo, watchLaterVideos) ? (
              <button
                className={
                  checkWatchLater(state.currentVideo, watchLaterVideos) ? " btn-fill" : ""
                }
                onClick={() =>
                  removeVideoFromWatchLaterHandler(state.currentVideo)
                }
              >
                <span>
                  <WatchLaterIcon />
                </span>
                watch later
              </button>
            ) : (
              <button
                onClick={() => addVideoToWatchLaterHandler(state.currentVideo)}
              >
                <span>
                  <WatchLaterIcon />
                </span>
                watch later
              </button>
            )}
            <button
              onClick={() => setSavePlaylistModal(true)}
              className={savePlaylistModal ? " btn-fill" : ""}
            >
              <span>
                <PlaylistIcon />
              </span>
              playlist
            </button>
          </div>
        </main>
        <aside className="video-aside">
          <h2 className="video-title">Must watch</h2>
          <div className="video-container">
            {mustWatchVideos(state).map((item) => (
              <li key={item._id}>
                <VideoCard item={item} />
              </li>
            ))}
          </div>
        </aside>
      </div>
      {savePlaylistModal && (
        <div className="modal-position">
          <PlaylistModal
            setSavePlaylistModal={setSavePlaylistModal}
            video={state.currentVideo}
          />
        </div>
      )}
    </>
  );
}
