import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context";
import "./Signup.css";

export function Signup() {
const {signupHandler, state, dispatch} = useContext(AuthContext);
  
  return (
    <div className="grid-layout-signup">
      <form
        className="form form-signup"
        onSubmit={(e) => {
          signupHandler(e);
        }}
      >
        <h2 className="title-form">Signup</h2>
        <div className="parent-div">
          <input
            type="text"
            placeholder="first name"
            className="form-input flex-1"
            name="firstName"
            onChange={(e) => dispatch({ type: "ADD_FIELD", payload: e.target })}
            required
          />
          <input
            type="text"
            placeholder="last name"
            className="form-input flex-1"
            name="lastName"
            onChange={(e) => dispatch({ type: "ADD_FIELD", payload: e.target })}
            required
          />
        </div>
        <input
          type="text"
          placeholder="email"
          className="form-input"
          name="email"
          onChange={(e) => dispatch({ type: "ADD_FIELD", payload: e.target })}
          required
        />
        {state.emailErrState && (
          <small className="form-error">invalid mail</small>
        )}
        <div className="parent-div">
          <input
            type={state.passwordType}
            placeholder="password"
            className="form-input flex-1"
            name="password"
            onChange={(e) => dispatch({ type: "ADD_FIELD", payload: e.target })}
            required
          />
          <span
            className="form-passwordeye"
            onClick={() => dispatch({ type: "CHANGE_TYPE" })}
          >
            {state.showPasswordIcon}
          </span>
        </div>
        {state.passwordErrState && (
          <small className="form-error">
            Password should be more than 8 character
          </small>
        )}
        <div className="parent-div">
          <input
            type={state.passwordType}
            placeholder="confirm password"
            className="form-input flex-1"
            name="confirmPassword"
            onChange={(e) => dispatch({ type: "ADD_FIELD", payload: e.target })}
            required
          />
          <span
            className="form-passwordeye"
            onClick={() => dispatch({ type: "CHANGE_TYPE" })}
          >
            {state.showPasswordIcon}
          </span>
        </div>
        {state.confirmPasswordErrState && (
          <small className="form-error">Password did not matched</small>
        )}
        <div className="form-checkbox signup-checkbox">
          <label>
            <input type="checkbox" required /> I accepted all terms and
            conditions
          </label>
        </div>
        <button className="btn btn-primary form-btn" type="submit">
          create new account
        </button>
        <Link to="/login" className="btn btn-link link-account">
          Already have an account
        </Link>
      </form>
    </div>
  );
}
