import {
    HistoryIcon,
    HomeIcon,
    LikedIcon,
    PlaylistIcon,
    TrendIcon,
    WatchLaterIcon,
  } from "../icons/Icons";
export  const asideData = [
    { to: "/", icon: <HomeIcon />, text: "home" },
    { to: "/trend", icon: <TrendIcon />, text: "trend" },
    { to: "/history", icon: <HistoryIcon />, text: "history" },
    { to: "/watchlater", icon: <WatchLaterIcon />, text: "watch later" },
    { to: "/likedvideos", icon: <LikedIcon />, text: "liked videos" },
    { to: "/playlist", icon: <PlaylistIcon />, text: "playlist" },
  ];