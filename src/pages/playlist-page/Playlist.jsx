import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Aside, VideoCard } from "../../components";
import { usePlaylist } from "../../context";
import { useTitle } from "../../hooks";
import "./Playlist.css";
export function Playlist() {
  useTitle("Playlist");
  const {
    state,
    playlistDispatch,
    getPlaylistHandler,
    removePlaylistHandler,
    removeVideoFromPlaylistHandler,
    getAllPlaylist,
  } = usePlaylist();

  const navigate = useNavigate();

  useEffect(() => {
    getAllPlaylist();
  }, [
    playlistDispatch,
    removePlaylistHandler,
    removeVideoFromPlaylistHandler,
    state,
    getAllPlaylist,
  ]);

  return (
    <div className="grid-layout">
      <Aside />
      {state.allPlaylist.length === 0 ? (
        <div className="center-text ft-grey ft-w-900">
          Please make some playlist...
        </div>
      ) : (
        <main className="playlist-main">
          <h2 className="playlist-title">All Playlists </h2>

          <ul className="playlist-container">
            {state.allPlaylist.map((item) => (
              <li key={item._id}>
                <h3
                  onClick={() => {
                    getPlaylistHandler(item);
                    navigate(`/playlist/${item._id}`);
                  }}
                >
                  {item.title}
                </h3>
                <p>
                  {item.videos.length} videos
                  <span
                    className="playlist-btn-close"
                    onClick={() => {
                      removePlaylistHandler(item);
                      navigate("/playlist");
                    }}
                  >
                    &times;
                  </span>
                </p>
              </li>
            ))}
          </ul>
          <h3 className="m-b-1">{state.currentPlaylist.title}</h3>
          <ul className="playlist-video-card">
            {state.allPlaylist &&
              state.currentPlaylist &&
              state.currentPlaylist.videos?.map((video) => (
                <li key={video._id} className="p-relative">
                  <VideoCard item={video} />
                  <span
                    className="btn btn-ss btn-link btn-remove-position"
                    onClick={() =>
                      removeVideoFromPlaylistHandler(
                        state.currentPlaylist._id,
                        video
                      )
                    }
                  >
                    remove
                  </span>
                </li>
              ))}
          </ul>
        </main>
      )}
    </div>
  );
}
