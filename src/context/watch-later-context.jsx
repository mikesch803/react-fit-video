import axios from "axios";
import { createContext } from "react";
import { useState } from "react";

const WatchLaterContext = createContext();

const WatchLaterProvider = ({ children }) => {
  const [watchLaterVideos, setWatchLaterVideos] = useState([]);

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

export { WatchLaterContext, WatchLaterProvider };
