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
  Signup,
  Video,
  VideoListing,
  WatchLater,
} from "./pages";
import { useToast } from "./context";

function App() {
  const { toastState } = useToast();
  return (
    <div className="App">
      <Header />
      {toastState && <Toast />}
      <Routes>
        <Route path="/trend" element={<VideoListing />} />
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
