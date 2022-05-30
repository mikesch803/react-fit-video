export const filterVideos = (state) => {
  let sortedVideos = [...state.allVideos];
  if(state.searchVideos) {
      console.log(state.searchVideos)
    sortedVideos = sortedVideos.filter(item => item.title.toLowerCase().match(state.searchVideos.toLowerCase()))
  }
  return sortedVideos;
}