export const mustWatchVideos = (allVideos, src) => {
  const currentVideo = allVideos.find((item) => item.src === src);
  const cateoryVideos = allVideos.filter(
    (item) => item.categoryName === currentVideo.categoryName
  );
  return cateoryVideos.filter((item) => item._id !== currentVideo._id);
};
