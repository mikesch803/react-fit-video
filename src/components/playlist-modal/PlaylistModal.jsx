import { usePlaylist } from "../../context";
import "./PlaylistModal.css";
export function PlaylistModal({ setSavePlaylistModal, video }) {
  const {
    state,
    playlistDispatch,
    addPlaylistHandler,
    addVideoToPlaylistHandler,
    removeVideoFromPlaylistHandler,
  } = usePlaylist();
  return (
    <div className="video-modal-playlist">
      <p>
        Save to playlist
        <span
          className="video-modal-close"
          onClick={() => setSavePlaylistModal(false)}
        >
          &times;
        </span>
      </p>
      <ul>
        {state.allPlaylist.map((item) => (
          <li key={item._id}>
            <label>
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
          </li>
        ))}
      </ul>
      {state.inputState && (
        <div className="video-playlist-input">
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
        </div>
      )}
      {state.inputState ? (
        <button
          className="btn btn-link btn-ss p-half"
          onClick={() => {
            addPlaylistHandler(state.field);
          }}
        >
          create
        </button>
      ) : (
        <button
          className="btn btn-ss btn-link p-half"
          onClick={() => playlistDispatch({ type: "INPUT_STATE" })}
        >
          + create new playlist
        </button>
      )}
    </div>
  );
}
