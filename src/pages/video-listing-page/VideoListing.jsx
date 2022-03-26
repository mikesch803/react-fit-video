import axios from "axios";
import React, { useEffect, useState } from "react";
import Aside from "../../components/aside/Aside";
import "./VideoListing.css";
export function VideoListing() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/videos");
      console.log(response.data);
      if (response.status === 200) {
        setVideos(response.data.videos);
      }
    })();
  }, []);

  return (
    <div className="trend-video-grid-layout">
      <Aside />
      <main className="trend-main">
        <h2 className="trend-title">Trending Videos</h2>
        <div className="video-container">
          {videos.map((video) => (
            <div className="card card-vrt" key={video._id}>
              <div className="card-img-container">
                <img className="card-img" src={video.src} alt="video" />
              </div>
              <div className="card-desc">
                <div className="avatar avatar-ss">
                  <img src={video.avatar} alt="avatar" className="circle-img" />
                </div>
                <div className="flex-1 m-l-1">
                  <h3>{video.title}</h3>
                  <p>{video.creator}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
