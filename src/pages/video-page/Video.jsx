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
import { Navigate, useParams } from "react-router-dom";
export function Video() {
  const { state } = useVideo();

  const { VideoId } = useParams();

  const currentVideo = state.allVideos?.find(item => item._id === VideoId)

  const { addToLikedVideoHandler, removeFromLikedVideoHandler, likedVideos } =
    useLikedVideo();

  const {
    addVideoToWatchLaterHandler,
    removeVideoFromWatchLaterHandler,
    watchLaterVideos,
  } = useWatchLater();

  const { savePlaylistModal, setSavePlaylistModal } = usePlaylistModal();
  useTitle("Video");
  if (currentVideo === undefined) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div
        className={
          savePlaylistModal ? `video-grid-layout gray` : `video-grid-layout`
        }
      >
        <Aside />
        <main className="video-main">
          <h2 className="video-title">{currentVideo.title}</h2>
          <iframe
            className="video-frame"
            frameBorder="0"
            allow="autoplay"
            title={currentVideo.title}
            src={`https://www.youtube.com/embed/${currentVideo.src}?autoplay=1`}
          />
          <div className="video-btns">
            {checkLikedVideo(currentVideo, likedVideos) ? (
              <button
                className={
                  checkLikedVideo(currentVideo, likedVideos)
                    ? " btn-fill"
                    : ""
                }
                onClick={() => removeFromLikedVideoHandler(currentVideo)}
              >
                <span>
                  <ThumbsUpIcon />
                </span>
                Liked
              </button>
            ) : (
              <button
                onClick={() => addToLikedVideoHandler(currentVideo)}
              >
                <span>
                  <ThumbsUpIcon />
                </span>
                Like
              </button>
            )}
            {checkWatchLater(currentVideo, watchLaterVideos) ? (
              <button
                className={
                  checkWatchLater(currentVideo, watchLaterVideos)
                    ? " btn-fill"
                    : ""
                }
                onClick={() =>
                  removeVideoFromWatchLaterHandler(currentVideo)
                }
              >
                <span>
                  <WatchLaterIcon />
                </span>
                watch later
              </button>
            ) : (
              <button
                onClick={() => addVideoToWatchLaterHandler(currentVideo)}
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
            {mustWatchVideos(state.allVideos, currentVideo).map((item) => (
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
            video={currentVideo}
          />
        </div>
      )}
    </>
  );
}
