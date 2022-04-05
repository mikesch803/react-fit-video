import { createContext, useReducer, useState } from "react";
import axios from "axios";
import { PassWordNotShowIcon } from "../icons/Icons";
import { AuthReducer } from "../reducer/AuthReducer";
import { useToast } from "./toast-context";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userState, setUserState] = useState(
    localStorage?.token ? true : false
  );
  const { setToastMsg, setToastStyles, setToastState } = useToast();
  const [state, dispatch] = useReducer(AuthReducer, {
    field: {},
    passwordType: "password",
    showPasswordIcon: <PassWordNotShowIcon />,
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
          setUserState(true);
          setToastStyles("alert alert-success");
          setToastMsg("Sign up successfully");
          setToastState(true);
          setTimeout(() => {
            setToastState(false);
          }, 1500);
          localStorage.setItem("token", response.data.encodedToken);
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    if (state.field.email.indexOf("@") === -1) {
      dispatch({ type: "EMAIL_ERR" });
    } else {
      dispatch({ type: "EMAIL_ERR" });
    }

    if (state.field.password.length < 8) {
      dispatch({ type: "PASSWORD_ERR" });
    } else {
      dispatch({ type: "PASSWORD_ERR" });
    }

    if (state.field.password !== state.field.confirmPassword) {
      dispatch({ type: "CONFIRM_PASSWORD_ERR" });
    } else {
      dispatch({ type: "CONFIRM_PASSWORD_ERR" });
    }
  };

  const loginUserHandler = async (e) => {
    e.preventDefault();

    if (state.field.email && state.field.password) {
      try {
        const response = await axios.post(`/api/auth/login`, state.field);

        if (response.status === 200) {
          setUserState(true);
          setToastStyles("alert alert-success");
          setToastMsg("Login successfully");
          setToastState(true);
          setTimeout(() => {
            setToastState(false);
          }, 1500);
          localStorage.setItem("token", response.data.encodedToken);
        }

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    if (state.field.email.indexOf("@") === -1) {
      dispatch({ type: "EMAIL_ERR" });
    } else {
      dispatch({ type: "EMAIL_ERR" });
    }

    if (state.field.password.length < 8) {
      dispatch({ type: "PASSWORD_ERR" });
    } else {
      dispatch({ type: "PASSWORD_ERR" });
    }
  };

  const logoutHandler = () => {
    localStorage.clear();
    setUserState(false);
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
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
