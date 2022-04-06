import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context";
import "./Header.css";
export function Header() {
  const { logoutHandler} = useAuth();
  return (
      <div className="navbar">
        <h1 className="navbar-title">
          <Link to="/" >
            Fit Video
          </Link>
        </h1>
        <div className="navbar-icons">
        { localStorage.token ?  
        <button onClick={logoutHandler} className="btn btn-link navbar-login">
        logout
      </button>
        :<Link to="/login" className="btn btn-link navbar-login">
            login
          </Link> 
           }
          <Link to="/trend" className="btn btn-link navbar-shop">
            Trend
          </Link>          
        </div>
      </div>
  );
}
