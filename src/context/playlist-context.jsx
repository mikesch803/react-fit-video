import axios from "axios";
import { createContext, useReducer, useContext, useState } from "react";
import { playlistReducer } from "../reducer/PlaylistReducer";
import { useToast } from "./toast-context";

const PlaylistContext = createContext();

const PlaylistProvider = ({ children }) => {
  const { toastHandler } = useToast();

  const [state, playlistDispatch] = useReducer(playlistReducer, {
    allPlaylist: [],
    InputState: false,
    field: {},
    videosInPlaylist: [],
    currentPlaylist: {},
  });

  const [playlistModal, setPlaylistModal] = useState(false);


  const getAllPlaylist = async () => {
      const encodedToken = localStorage.getItem("token");
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
    }

  const addPlaylistHandler = async(playlist) => {
      try {
        const encodedToken = localStorage.getItem("token");
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
          playlistDispatch({
            type: "PLAYLISTS",
            payload: response.data.playlists,
          });
          toastHandler("Playlist created", "alert-success")
        }
      } catch (err) {
        if (err.response.status === 500) {
          toastHandler("Login first", "alert-warning");
        }
      }
  };

  const removePlaylistHandler = async(playlist) => {
      try {
        const encodedToken = localStorage.getItem("token");
        const response = await axios.delete(
          `/api/user/playlists/${playlist._id}`,
          {
            headers: {
              authorization: encodedToken,
            },
          }
        );
        if (response.status === 200) {
          playlistDispatch({
            type: "PLAYLISTS",
            payload: response.data.playlists,
          });
          playlistDispatch({ type: "DELETE_PLAYLIST" });
          toastHandler("Playlist removed", "alert-danger");
        }
      } catch (err) {
        console.error(err);
      }
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
          playlistDispatch({
            type: "UPDATE_PLAYLIST",
            payload: response.data.playlist,
          });
          toastHandler("Playlist updated", "alert-success");
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

          playlistDispatch({
            type: "CURRENT_PLAYLIST",
            payload: response.data.playlist,
          });

          playlistDispatch({
            type: "UPDATE_PLAYLIST",
            payload: response.data.playlist,
          });
          toastHandler("Removed video from playlist", "alert-danger");
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
          playlistDispatch({
            type: "CURRENT_PLAYLIST",
            payload: response.data.playlist,
          });
          playlistDispatch({
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
        playlistDispatch,
        addPlaylistHandler,
        removePlaylistHandler,
        addVideoToPlaylistHandler,
        removeVideoFromPlaylistHandler,
        getPlaylistHandler,
        playlistModal,
        setPlaylistModal,
        getAllPlaylist,
        
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylist = () => useContext(PlaylistContext);

export { PlaylistContext, PlaylistProvider, usePlaylist };
