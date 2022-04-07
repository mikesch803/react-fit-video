import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context";
import { PassWordNotShowIcon, PassWordShowIcon } from "../../icons/Icons";
import "./Login.css";

export function Login() {
  const { loginUserHandler, state, dispatch, guestLoginHandler } = useAuth();

  return (
    <div className="grid-layout-login">
      <form className="form form-login" onSubmit={(e) => loginUserHandler(e)}>
        <h2 className="title-form">Login</h2>
        <input
          required
          type="text"
          placeholder="email"
          className="form-input"
          name="email"
          onChange={(e) => dispatch({ type: "ADD_FIELD", payload: e.target })}
        />
        {state.emailErrState && (
          <small className="form-error">
            email invalid
          </small>
        )}
        <div className="parent-div">
          <input
            required
            type={state.passwordType}
            placeholder="password"
            className="form-input flex-1"
            name="password"
            onChange={(e) => dispatch({ type: "ADD_FIELD", payload: e.target })}
          />
          <span
            className="form-passwordeye"
            onClick={() => dispatch({ type: "CHANGE_TYPE" })}
          >
            {state.passwordType === 'text' ? <PassWordShowIcon/>:<PassWordNotShowIcon/>}
          </span>
        </div>
        {state.passwordErrState && (
          <small className="form-error">
            Password should be more than 8 character
          </small>
        )}
        <div className="form-checkbox">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <Link to="#" className="btn btn-link">
            Forget password?
          </Link>
        </div>
        <button className="btn btn-primary form-btn" type="submit">
          login
        </button>
        <button className="btn btn-outline form-btn" onClick={(e) => guestLoginHandler(e)}>
          guest login
        </button>
        <Link to="/signup" className="btn btn-link link-account">
          create a new account
        </Link>
      </form>
    </div>
  );
}
