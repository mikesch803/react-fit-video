import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { VideoProvider } from "./context/video-context";
import { AuthProvider } from "./context/auth-context";
import { LikeVideoProvider } from "./context/like-video-context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <VideoProvider>
        <LikeVideoProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LikeVideoProvider>
      </VideoProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
