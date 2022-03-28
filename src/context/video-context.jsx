import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { videoReducer } from "../reducer/VideoReducer";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/videos");
        console.log(response.data);
        if (response.status === 200) {
          dispatch({ type: "SET_ALL_VIDEOS", payload: response.data.videos });
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/categories");
        if (response.status === 200) {
          dispatch({
            type: "SET_VIDEOS_BY_CATEGORY",
            payload: response.data.categories,
          });
          console.log(response.data.categories);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const [state, dispatch] = useReducer(videoReducer, {
    allVideos: [],
    categoryVideos: [],
  });

  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};

export { VideoContext, VideoProvider };
