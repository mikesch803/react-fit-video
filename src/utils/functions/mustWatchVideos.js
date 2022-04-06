export const mustWatchVideos = (state) => {
  const cateoryVideos = state.allVideos.filter(
    (item) => item.categoryName === state.currentVideo.categoryName
  );
 return cateoryVideos.filter((item) => item._id !== state.currentVideo._id);
};
