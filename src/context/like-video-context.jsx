import axios from "axios";
import { createContext, useState } from "react";

const LikedVideoContext = createContext();

const LikedVideoProvider = ({ children }) => {
  const [likedVideos, setLikedVideos] = useState([]);

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
        }
      } catch (err) {
        console.error(err);
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

export { LikedVideoContext, LikedVideoProvider };
