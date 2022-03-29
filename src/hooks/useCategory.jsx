import { useContext, useState } from 'react';
import { VideoContext } from '../context';

export  function useCategory() {

    const { state } = useContext(VideoContext);
  const [categoryVideos, setCateogoryVideos] = useState([]);
    
  const categoryHandler = (item) => {
    let sortVideos = [...state.allVideos];
    setCateogoryVideos(
      sortVideos.filter((video) => video.categoryName === item.categoryName)
    );
  };

  
  return {categoryHandler, categoryVideos ,setCateogoryVideos}
}
