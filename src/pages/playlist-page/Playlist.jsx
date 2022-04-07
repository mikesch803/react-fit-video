import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Aside, VideoCard } from "../../components";
import { usePlaylist } from "../../context";
import { usePlaylistModal } from "../../hooks";
import "./Playlist.css";
export function Playlist() {
  const {
    state,
    playlistDispatch,
    getPlaylistHandler,
    removePlaylistHandler,
    addPlaylistHandler,
    removeVideoFromPlaylistHandler,
  } = usePlaylist();

  const navigate = useNavigate();
  const { savePlaylistModal, setSavePlaylistModal } = usePlaylistModal();
  useEffect(() => {
    const encodedToken = localStorage.getItem("token");
    (async () => {
      try {
        const response = await axios.get("/api/user/playlists", {
          headers: {
            authorization: encodedToken,
          },
        });
        if (response.status === 200) {
          playlistDispatch({ type: "PLAYLISTS", payload: response.data.playlists });
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [playlistDispatch, removePlaylistHandler, removeVideoFromPlaylistHandler, state]);

  return (
    <div className="playlist-grid-layout">
      <Aside />
      <main className="playlist-main">
        <h2 className="playlist-title">
          All Playlists{" "}
          <span
            className="btn btn-primary m-l-auto"
            onClick={() => setSavePlaylistModal(true)}
          >
            create a playlist
          </span>
        </h2>
        {savePlaylistModal && (
          <div className="playlist-input">
            <label>Title</label>
            <input
              type="text"
              name="title"
              onChange={(e) =>
                playlistDispatch({
                  type: "ADD_TITLE_DESCRIPTION",
                  payload: e.target,
                })
              }
            />
            <label>Description</label>{" "}
            <input
              type="text"
              name="description"
              onChange={(e) =>
                playlistDispatch({
                  type: "ADD_TITLE_DESCRIPTION",
                  payload: e.target,
                })
              }
            />
            <button
              className="btn btn-primary btn-ss"
              onClick={() => {
                addPlaylistHandler(state.field);
                setSavePlaylistModal(false);
              }}
            >
              create
            </button>
          </div>
        )}
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
          {state.allPlaylist && state.currentPlaylist &&
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
    </div>
  );
}
