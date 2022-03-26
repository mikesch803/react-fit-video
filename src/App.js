import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components";
import { Home,VideoListing } from "./pages";

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/trend" element={<VideoListing/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
