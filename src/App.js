import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header, NavbarBottom, Toast } from "./components";
import Mockman from "mockman-js";
import {
  Auth,
  History,
  Home,
  LikedVideos,
  Login,
  NotFound,
  Playlist,
  Profile,
  Signup,
  Video,
  WatchLater,
} from "./pages";

function App() {
  return (
    <div className="App">
      <Header />
      <Toast/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`/video/:videoId`} element={<Video />} />
        <Route path={`/category:categoryId`} element={<Home />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<Auth />}>
          <Route path="/history" element={<History />} />
          <Route path="/watchlater" element={<WatchLater />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path={`/playlist/:playlistId`} element={<Playlist />} />
          <Route path="/likedvideos" element={<LikedVideos />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/mock" element={<Mockman />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <NavbarBottom />
    </div>
  );
}

export default App;
