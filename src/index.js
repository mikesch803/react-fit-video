import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import {
  AuthProvider,
  HistoryProvider,
  LikedVideoProvider,
  PlaylistProvider,
  VideoProvider,
  WatchLaterProvider,
} from "./context";
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <VideoProvider>
        <PlaylistProvider>
          <HistoryProvider>
            <WatchLaterProvider>
              <LikedVideoProvider>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </LikedVideoProvider>
            </WatchLaterProvider>
          </HistoryProvider>
        </PlaylistProvider>
      </VideoProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
