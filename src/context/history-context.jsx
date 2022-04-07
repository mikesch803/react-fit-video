import axios from "axios";
import { createContext, useState, useContext } from "react";
import { useToast } from "./index";

const HistoryContext = createContext();

const HistoryProvider = ({ children }) => {
  const [historyVideos, setHistoryVideos] = useState([]);
  const {setToastMsg, setToastState, setToastStyles} = useToast();
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
          setToastStyles("alert alert-danger")
          setToastMsg("Removed from history")
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
          setToastStyles("alert alert-success")
          setToastMsg("History cleared")
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

const useHistory = () => useContext(HistoryContext);

export { HistoryContext, HistoryProvider, useHistory };
