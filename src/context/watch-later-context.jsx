import axios from "axios";
import { createContext } from "react";
import { useState, useContext } from "react";
import { useToast } from "./toast-context";

const WatchLaterContext = createContext();

const WatchLaterProvider = ({ children }) => {
  const [watchLaterVideos, setWatchLaterVideos] = useState([]);
  const { setToastMsg, setToastState, setToastStyles } = useToast();
  const addVideoToWatchLaterHandler = (video) => {
    const encodedToken = localStorage.getItem("token");
    (async () => {
      try {
        const response = await axios.post(
          "/api/user/watchlater",
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
          setWatchLaterVideos(response.data.watchlater);
          setToastStyles("alert alert-info");
          setToastMsg("Video is added to watch later");
          setToastState(true);
          setTimeout(() => {
            setToastState(false);
          }, 1500);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  };

  const removeVideoFromWatchLaterHandler = (video) => {
    const encodedToken = localStorage.getItem("token");
    (async () => {
      try {
        const response = await axios.delete(
          `/api/user/watchlater/${video._id}`,
          {
            headers: {
              authorization: encodedToken,
            },
          }
        );
        if (response.status === 200) {
          setWatchLaterVideos(response.data.watchlater);
          setToastStyles("alert alert-info");
          setToastMsg("video is removed from watch later");
          setToastState(true);
          setTimeout(() => {
            setToastState(false);
          }, 1500);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  };

  return (
    <WatchLaterContext.Provider
      value={{
        addVideoToWatchLaterHandler,
        removeVideoFromWatchLaterHandler,
        watchLaterVideos,
        setWatchLaterVideos,
      }}
    >
      {children}
    </WatchLaterContext.Provider>
  );
};

const useWatchLater = () => useContext(WatchLaterContext);

export { WatchLaterContext, WatchLaterProvider, useWatchLater };
