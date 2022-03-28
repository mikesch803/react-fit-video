import React from "react";
import { MoreOptionsIcon } from "../../icons/Icons";
export function VideoCard({ item }) {
  return (
    <div className="card card-vrt">
      <div className="card-img-container">
        <img className="card-img" src={item.thumbnail} alt={item.alt} />
      </div>
      <div className="card-desc">
        <div className="avatar avatar-ss">
          <img src={item.avatar} alt="avatar" className="circle-img" />
        </div>
        <div className="flex-1 m-l-1">
          <p>{item.title.length > 50 ? item.title.substring(0,51)+'...' : item.title}</p>
          <small>{item.creator}</small>
        </div>
        <MoreOptionsIcon />
      </div>
    </div>
  );
}
