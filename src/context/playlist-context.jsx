import axios from "axios";
import { createContext, useReducer } from "react";
import { playlistReducer } from "../reducer/PlaylistReducer";

const PlaylistContext = createContext();

const PlaylistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(playlistReducer, {
    allPlaylist: [],
    InputState: false,
    field: {},
    videosInPlaylist: [],
    currentPlaylist: {},
  });

  const addPlaylistHandler = (playlist) => {
    const encodedToken = localStorage.getItem("token");
    (async () => {
      try {
        const response = await axios.post(
          "/api/user/playlists",
          {
            playlist: {
              title: playlist.title,
              description: playlist.description,
            },
          },
          {
            headers: {
              authorization: encodedToken,
            },
          }
        );
        if (response.status === 201) {
          dispatch({ type: "PLAYLISTS", payload: response.data.playlists });
        }
      } catch (err) {
        console.error(err);
      }
    })();
  };

  const removePlaylistHandler = (playlist) => {
    const encodedToken = localStorage.getItem("token");
    (async () => {
      try {
        const response = await axios.delete(
          `/api/user/playlists/${playlist._id}`,
          {
            headers: {
              authorization: encodedToken,
            },
          }
        );
        if (response.status === 200) {
          dispatch({ type: "PLAYLISTS", payload: response.data.playlists });
          dispatch({ type: "DELETE_PLAYLIST" });
        }
      } catch (err) {
        console.error(err);
      }
    })();
  };

  const addVideoToPlaylistHandler = (id, video) => {
    const encodedToken = localStorage.getItem("token");
    (async () => {
      try {
        const response = await axios.post(
          `/api/user/playlists/${id}`,
          {
            video,
          },
          {
            headers: {
              authorization: encodedToken,
            },
          }
        );
        if (response.status === 201) {
          dispatch({
            type: "VIDEOS_IN_PLAYLIST",
            payload: response.data.playlist.videos,
          });

          dispatch({
            type: "CURRENT_PLAYLIST",
            payload: response.data.playlist,
          });

          dispatch({
            type: "UPDATE_PLAYLIST",
            payload: response.data.playlist,
          });
        }
      } catch (err) {
        console.error(err);
      }
    })();
  };

  const removeVideoFromPlaylistHandler = (id, video) => {
    const encodedToken = localStorage.getItem("token");
    (async () => {
      try {
        const response = await axios.delete(
          `/api/user/playlists/${id}/${video._id}`,
          {
            headers: {
              authorization: encodedToken,
            },
          }
        );
        if (response.status === 200) {
          dispatch({
            type: "VIDEOS_IN_PLAYLIST",
            payload: response.data.playlist.videos,
          });
          dispatch({
            type: "CURRENT_PLAYLIST",
            payload: response.data.playlist,
          });

          dispatch({
            type: "UPDATE_PLAYLIST",
            payload: response.data.playlist,
          });
        }
      } catch (err) {
        console.error(err);
      }
    })();
  };

  const getPlaylistHandler = (item) => {
    const encodedToken = localStorage.getItem("token");
    (async () => {
      try {
        const response = await axios.get(`/api/user/playlists/${item._id}`, {
          headers: {
            authorization: encodedToken,
          },
        });
        if (response.status === 200) {
          dispatch({
            type: "CURRENT_PLAYLIST",
            payload: response.data.playlist,
          });
          dispatch({
            type: "UPDATE_PLAYLIST",
            payload: response.data.playlist,
          });
        }
      } catch (err) {
        console.error(err);
      }
    })();
  };

  return (
    <PlaylistContext.Provider
      value={{
        state,
        dispatch,
        addPlaylistHandler,
        removePlaylistHandler,
        addVideoToPlaylistHandler,
        removeVideoFromPlaylistHandler,
        getPlaylistHandler,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export { PlaylistContext, PlaylistProvider };
