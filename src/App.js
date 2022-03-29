import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components";
import Mockman from "mockman-js";
import {
  Auth,
  History,
  Home,
  LikedVideos,
  Login,
  NotAuth,
  Playlist,
  // Signup,
  Video,
  VideoListing,
  WatchLater,
} from "./pages";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/trend" element={<VideoListing />} />
        <Route path="/" element={<Home />} />
        <Route path="/video" element={<Video/>}/>
        <Route element={<NotAuth />}>
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<Auth />}>
          <Route path="/history" element={<History />} />
          <Route path="/watchlater" element={<WatchLater />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/likedvideos" element={<LikedVideos />} />
        </Route>
        <Route path="/mock" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
