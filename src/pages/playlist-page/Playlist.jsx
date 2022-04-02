import axios from "axios";
import React from "react";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Aside, VideoCard } from "../../components";
import { PlaylistContext } from "../../context";
import usePlaylistModal from "../../hooks/usePlaylistModal";
import "./Playlist.css";
export function Playlist() {
  const {
    state,
    dispatch,
    getPlaylistHandler,
    removePlaylistHandler,
    addPlaylistHandler,
    removeVideoFromPlaylistHandler,
  } = useContext(PlaylistContext);

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
          dispatch({ type: "PLAYLISTS", payload: response.data.playlists });
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [dispatch,removePlaylistHandler, removeVideoFromPlaylistHandler, state]);

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
                dispatch({
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
                dispatch({
                  type: "ADD_TITLE_DESCRIPTION",
                  payload: e.target,
                })
              }
            />
            <button
              className="btn btn-primary btn-ss"
              onClick={() => {
                addPlaylistHandler(state.field);
              }}
            >
              create
            </button>
          </div>
        )}
        <div className="playlist-all">
          {state.allPlaylist.map((item) => (
            <li key={item._id} className="playlist-list">
              <h3
                className="playlist-list-title"
                onClick={() => {
                  getPlaylistHandler(item);
                   navigate(`/playlist/${item._id}`)
                }}
              >
                {item.title}
              </h3>
              <p>
                {item.videos.length} videos
                <span
                  className="playlist-btn-close"
                  onClick={() => { removePlaylistHandler(item); navigate("/playlist") }}
                >
                  &times;
                </span>
              </p>
            </li>
          ))}
        </div>
        <h3>{state.currentPlaylist.title}</h3>
        {state.currentPlaylist &&
          state.currentPlaylist.videos?.map((video) => (
            <div key={video._id} className="playlist-video-card">
              <VideoCard item={video} />
            </div>
          ))}
      </main>
    </div>
  );
}
