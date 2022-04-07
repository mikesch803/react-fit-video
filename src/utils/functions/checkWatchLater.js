export const checkWatchLater = (item, watchLaterVideos) => 
    watchLaterVideos.some(
        (video) => video._id === item._id
      )
