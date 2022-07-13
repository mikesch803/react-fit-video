export const getFilterVideos = (state) => {
  let filteredVideos = [...state.allVideos];
  if (state.category) {
    filteredVideos = filteredVideos.filter(
      (item) => item.categoryName === state.category
    );
  }
  if (state.category === "all") {
    filteredVideos = state.allVideos;
  }
  if (state.search) {
    filteredVideos = filteredVideos.filter((item) =>
      item.title.toLowerCase().match(state.search.toLowerCase())
    );
  }
  return filteredVideos;
};
