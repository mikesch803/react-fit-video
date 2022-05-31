import React from "react";
import { Aside } from "../../components";
import { useAuth } from "../../context";
import { useTitle } from "../../hooks";
import "./Profile.css";
export function Profile() {
  const { user, logoutHandler } = useAuth();
  useTitle("Profile");
  return (
    <div className="grid-layout">
      <Aside />
      <main className="profile-container ft-grey">
        <div className="profile-box">
          <h2>Personal Information</h2>
          <h3>
            Name :
            <span className="ft-w-400">
              {user.firstName} {user.lastName}
            </span>
          </h3>
          <h3>
            Email :<span className="ft-w-400"> {user.email}</span>
          </h3>
          <button className="btn btn-logout" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}
