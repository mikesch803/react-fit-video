import axios from "axios";
import { createContext, useEffect, useReducer, useContext } from "react";
import { videoReducer } from "../reducer/VideoReducer";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {


  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/videos");
        if (response.status === 200) {
          dispatch({ type: "ALL_VIDEOS", payload: response.data.videos });
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
            type: "VIDEOS_BY_CATEGORY",
            payload: response.data.categories,
          });
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);


  const [state, dispatch] = useReducer(videoReducer, {
    allVideos: [],
    categoryVideos: [],
    searchVideos:null
  });

  

  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};

const useVideo = () => useContext(VideoContext);

export { VideoContext, VideoProvider, useVideo };
