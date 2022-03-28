import { createContext, useReducer, useState } from "react";
import axios from "axios";
import { PassWordNotShowIcon } from "../icons/Icons";
import { AuthReducer } from "../reducer/AuthReducer";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userState, setUserState] = useState(false);

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
        }
        console.log(response);
        console.log(state.userState);
        // saving the encodedToken in the localStorage
        localStorage.setItem("token", response.data.encodedToken);
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
        // const encodedToken = localStorage.getItem("token");
        localStorage.setItem("token", response.data.encodedToken);
        if (response.status === 200) {
          setUserState(true);
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

  return (
    <AuthContext.Provider
      value={{ state, dispatch, signupHandler, loginUserHandler, userState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
