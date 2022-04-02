import React, { useContext } from "react";
import { PlaylistContext } from "../../context";
import "./PlaylistModal.css";
export function PlaylistModal({ setSavePlaylistModal, video }) {
  const {
    state,
    dispatch,
    addPlaylistHandler,
    addVideoToPlaylistHandler,
    removeVideoFromPlaylistHandler,
  } = useContext(PlaylistContext);
  return (
    <div className="modal-playlist">
      <p className="">
        Save to playlist{" "}
        <span
          className="modal-close"
          onClick={() => setSavePlaylistModal(false)}
        >
          &times;
        </span>
      </p>
      {state.allPlaylist.map((item) => (
        <label key={item._id}>
          <input
            type="checkbox"
            checked={item.videos.some((ele) => ele._id === video._id)}
            onChange={() => {
              item.videos.some((item) => item._id === video._id)
                ? removeVideoFromPlaylistHandler(item._id, video)
                : addVideoToPlaylistHandler(item._id, video);
            }}
          />
          {item.title}
        </label>
      ))}
      {state.inputState && (
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
        </div>
      )}
      {state.inputState ? (
        <button
          className="btn btn-link btn-ss p-0"
          onClick={() => {
            addPlaylistHandler(state.field);
          }}
        >
          create
        </button>
      ) : (
        <button
          className="btn btn-ss btn-link p-0"
          onClick={() => dispatch({ type: "INPUT_STATE" })}
        >
          + create new playlist
        </button>
      )}
    </div>
  );
}
