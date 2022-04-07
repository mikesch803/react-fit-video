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

  const videoClickHandler = (item) => {
    (async () => {
      try {
        const response = await axios.get(`/api/video/${item._id}`);

        if (response.status === 200) {
          dispatch({
            type: "CURRENT_VIDEO",
            payload: response.data.video,
          });
        }
      } catch (err) {
        console.log(err);
      }
    })();
  };

  const [state, dispatch] = useReducer(videoReducer, {
    allVideos: [],
    categoryVideos: [],
    currentVideo: {},
  });

  return (
    <VideoContext.Provider value={{ state, dispatch, videoClickHandler }}>
      {children}
    </VideoContext.Provider>
  );
};

const useVideo = () => useContext(VideoContext);

export { VideoContext, VideoProvider, useVideo };
