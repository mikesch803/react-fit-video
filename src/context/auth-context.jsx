import { createContext, useReducer, useState, useContext } from "react";
import axios from "axios";
import { AuthReducer } from "../reducer/AuthReducer";
import { useToast } from "./toast-context";
import { useLikedVideo } from "./like-video-context";
import { useHistory } from "./history-context";
import { useWatchLater } from "./watch-later-context";
import { usePlaylist } from "./playlist-context";
import { useLocation, useNavigate } from "react-router-dom";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const { setHistoryVideos } = useHistory();
  const { setLikedVideos } = useLikedVideo();
  const { setWatchLaterVideos } = useWatchLater();
  const { playlistDispatch } = usePlaylist();
  const navigate = useNavigate();
  const location = useLocation();
  const [userState, setUserState] = useState(
    localStorage?.token ? true : false
  );
  const user = JSON.parse(localStorage.getItem("user"));
  const { setToastMsg, setToastStyles, setToastState } = useToast();
  const [state, dispatch] = useReducer(AuthReducer, {
    field: {},
    passwordType: "password",
    emailErrState: false,
    passwordErrState: false,
    confirmPasswordErrState: false,
  });

  const signupHandler = async (e) => {
    e.preventDefault();
    if (
      state.field.email.indexOf("@") >= 0 &&
      state.field.password.length >= 8 &&
      state.field.confirmPassword === state.field.password
    ) {
      try {
        const response = await axios.post(`/api/auth/signup`, state.field);
        if (response.status === 201) {
          localStorage.setItem("token", response.data.encodedToken);
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.createdUser)
          );
          setUserState(true);
          navigate("/");
          setToastStyles("alert alert-success");
          setToastMsg("Sign up successfully");
          setToastState(true);
          setTimeout(() => {
            setToastState(false);
          }, 1500);
        }
      } catch (error) {}
    }
  };

  const loginUserHandler = async (e) => {
    e.preventDefault();

    if (state.field.email && state.field.password) {
      try {
        const response = await axios.post(`/api/auth/login`, state.field);

        if (response.status === 200) {
          localStorage.setItem("token", response.data.encodedToken);
          localStorage.setItem("user", JSON.stringify(response.data.foundUser));
          setUserState(true);
          navigate(location?.state?.from?.pathname || "/");
          setToastStyles("alert alert-success");
          setToastMsg("Login successfully");
          setToastState(true);
          setTimeout(() => {
            setToastState(false);
          }, 1500);
        }
      } catch (error) {
        if (error.response.status === 404) {
          setToastState(true);
          setToastMsg("Please sign up first");
          setToastStyles("alert alert-warning");
          setTimeout(() => {
            setToastState(false);
          }, 1500);
        }
      }
    }
  };


  const guestLoginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/auth/login`, {
        email: "mahendrachauhan@gmail.com",
        password: "mahendra123",
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.encodedToken);
        localStorage.setItem("user", JSON.stringify(response.data.foundUser));
        setUserState(true);
        navigate(location?.state?.from?.pathname || '/');
        setToastState(true);
        setToastMsg("Login sucessfully");
        setToastStyles("alert alert-success");
        setTimeout(() => {
          setToastState(false);
        }, 1500);
      }
    } catch (error) {
    }
  };

  const logoutHandler = () => {
    setHistoryVideos([]);
    setLikedVideos([]);
    setWatchLaterVideos([]);
    playlistDispatch({ type: "RESET_ALL_PLAYLIST" });
    playlistDispatch({ type: "DELETE_PLAYLIST" });
    setUserState(false);
    localStorage.clear();
    setToastStyles("alert alert-success");
    setToastMsg("Logout successfully");
    setToastState(true);
    setTimeout(() => {
      setToastState(false);
    }, 1500);
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        signupHandler,
        loginUserHandler,
        userState,
        user,
        logoutHandler,
        guestLoginHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
