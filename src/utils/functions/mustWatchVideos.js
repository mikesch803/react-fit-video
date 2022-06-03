export const mustWatchVideos = (allVideos, currentVideo) => {
  const cateoryVideos = allVideos.filter(
    (item) => item.categoryName === currentVideo.categoryName
  );
 return cateoryVideos.filter((item) => item._id !== currentVideo._id);
};
