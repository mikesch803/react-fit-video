export  const videoReducer = (state, action) => {
    switch (action.type) {
      case "SET_ALL_VIDEOS":
        return { ...state, allVideos: action.payload };

      case "SET_VIDEOS_BY_CATEGORY":
          return {...state, categoryVideos: action.payload}
      default:
        return state;
    }
  }