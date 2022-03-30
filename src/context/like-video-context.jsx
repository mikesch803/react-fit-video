import axios from "axios";
import { createContext, useState } from "react";

const LikeVideoContext = createContext();

const LikeVideoProvider = ({ children }) => {
  const [likeVideos, setLikeVideos] = useState([]);
  const encodedToken = localStorage.getItem("token");

  const addToLikedVideoHandler = (video) => {
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
          setLikeVideos(response.data.likes);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  };

  const removeFromLikeVideoHandler = (video) => {
    (async () => {
      try {
        const response = await axios.delete(`/api/user/likes/${video._id}`, {
          headers: {
            authorization: encodedToken,
          },
        });
        console.log(response);
        if (response.status === 200) {
          setLikeVideos(response.data.likes);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  };

  return (
    <LikeVideoContext.Provider
      value={{
        addToLikedVideoHandler,
        removeFromLikeVideoHandler,
        likeVideos,
        setLikeVideos
      }}
    >
      {children}
    </LikeVideoContext.Provider>
  );
};

export { LikeVideoContext, LikeVideoProvider };
