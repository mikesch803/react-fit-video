import axios from "axios";
import { createContext, useState } from "react";

const HistoryContext = createContext();

const HistoryProvider = ({ children }) => {
  const [historyVideos, setHistoryVideos] = useState([]);

  const addVideoToHistoryHandler = (video) => {
    const encodedToken = localStorage.getItem("token");
    (async () => {
      try {
        const response = await axios.post(
          "/api/user/history",
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
          setHistoryVideos(response.data.history);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  };

  const removeVideoFromHistoryHandler = (video) => {
    const encodedToken = localStorage.getItem("token");
    (async () => {
      try {
        const response = await axios.delete(`/api/user/history/${video._id}`, {
          headers: {
            authorization: encodedToken,
          },
        });
        if (response.status === 200) {
          setHistoryVideos(response.data.history);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  };

  const clearHistoryHandler = () => {
    const encodedToken = localStorage.getItem("token");
    (async () => {
      try {
        const response = await axios.delete(`/api/user/history/all`, {
          headers: {
            authorization: encodedToken,
          },
        });
        if (response.status === 200) {
          setHistoryVideos(response.data.history);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  };
  return (
    <HistoryContext.Provider
      value={{
        historyVideos,
        setHistoryVideos,
        addVideoToHistoryHandler,
        removeVideoFromHistoryHandler,
        clearHistoryHandler,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export { HistoryContext, HistoryProvider };
