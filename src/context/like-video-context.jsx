import axios from "axios";
import { createContext, useState, useContext } from "react";
import { useToast } from "./toast-context";

const LikedVideoContext = createContext();

const LikedVideoProvider = ({ children }) => {
  const [likedVideos, setLikedVideos] = useState([]);
  const {setToastMsg, setToastStyles, setToastState} = useToast();

  const addToLikedVideoHandler = (video) => {
      
  const encodedToken = localStorage.getItem("token");
    (async () => {
      try {
        const response = await axios.post(
          "/api/user/likes",
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
          setLikedVideos(response.data.likes);
          setToastStyles("alert alert-success")
          setToastMsg("Added to liked videos")
          setToastState(true);
          setTimeout(()=>{
            setToastState(false)
          },1500)
        }
      } catch (err) {
        if (err.response.status === 500) {
          setToastStyles("alert alert-warning")
          setToastMsg("Login first")
          setToastState(true);
          setTimeout(()=>{
            setToastState(false)
          },1500)
        }
      }
    })();
  };

  const removeFromLikedVideoHandler = (video) => {
      
  const encodedToken = localStorage.getItem("token");
    (async () => {
      try {
        const response = await axios.delete(`/api/user/likes/${video._id}`, {
          headers: {
            authorization: encodedToken,
          },
        });
        if (response.status === 200) {
          setLikedVideos(response.data.likes);
          setToastStyles("alert alert-danger")
          setToastMsg("Removed from liked videos")
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
    <LikedVideoContext.Provider
      value={{
        addToLikedVideoHandler,
        removeFromLikedVideoHandler,
        likedVideos,
        setLikedVideos
      }}
    >
      {children}
    </LikedVideoContext.Provider>
  );
};

const useLikedVideo = () => useContext(LikedVideoContext);

export { LikedVideoContext, LikedVideoProvider, useLikedVideo };
