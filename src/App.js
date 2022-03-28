import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components";
import { History, Home,LikedVideos,Playlist,VideoListing, WatchLater } from "./pages";

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/trend" element={<VideoListing/>}/>
        <Route path="/" element={<Home/>}/>
        {/* <Route path="/history" element={<History/>}/>
        <Route path="/watchlater" element={<WatchLater/>}/>
        <Route path="/playlist" element={<Playlist/>}/>
        <Route path="/likedvideos" element={<LikedVideos/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
