import { createContext, useReducer, useState, useContext } from "react";
import axios from "axios";
import { AuthReducer } from "../reducer/AuthReducer";
import { useLocation, useNavigate } from "react-router-dom";
import { useHistory, useLikedVideo, usePlaylist, useToast, useWatchLater } from "./index";
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
  const { toastHandler } = useToast();
  const [state, dispatch] = useReducer(AuthReducer, {
    field: {},
    passwordType: "password",
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
          toastHandler("Sign in successfully ","alert-success");
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
          toastHandler("Login successfully", "alert-success")
        }
      } catch (error) {
        if (error.response.status === 404) {
          toastHandler("Please sign up first", "alert-warning");
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
        toastHandler("Login successfully", "alert-success")
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
    toastHandler("Logout successfully", "alert-success")
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
