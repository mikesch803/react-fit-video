import axios from "axios";
import { createContext, useReducer, useContext } from "react";
import { playlistReducer } from "../reducer/PlaylistReducer";
import { useToast } from "./toast-context";

const PlaylistContext = createContext();

const PlaylistProvider = ({ children }) => {

  const {setToastMsg, setToastState, setToastStyles} = useToast();

  const [state, playlistDispatch] = useReducer(playlistReducer, {
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
          playlistDispatch({ type: "PLAYLISTS", payload: response.data.playlists });
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
          playlistDispatch({ type: "PLAYLISTS", payload: response.data.playlists });
          playlistDispatch({ type: "DELETE_PLAYLIST" });
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
          playlistDispatch({
            type: "VIDEOS_IN_PLAYLIST",
            payload: response.data.playlist.videos,
          });

          playlistDispatch({
            type: "CURRENT_PLAYLIST",
            payload: response.data.playlist,
          });

          playlistDispatch({
            type: "UPDATE_PLAYLIST",
            payload: response.data.playlist,
          });
          setToastStyles("alert alert-info")
          setToastMsg("Playlist updated")
          setToastState(true);
          setTimeout(()=>{
            setToastState(false)
          },1500)
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
            type: "VIDEOS_IN_PLAYLIST",
            payload: response.data.playlist.videos,
          });
          playlistDispatch({
            type: "CURRENT_PLAYLIST",
            payload: response.data.playlist,
          });

          playlistDispatch({
            type: "UPDATE_PLAYLIST",
            payload: response.data.playlist,
          });
          setToastStyles("alert alert-info")
          setToastMsg("playlist updated")
          setToastState(true);
          setTimeout(()=>{
            setToastState(false)
          },1500)
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
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylist = () => useContext(PlaylistContext);

export { PlaylistContext, PlaylistProvider, usePlaylist };
