export const videoReducer = (state, action) => {
  switch (action.type) {
    case "ALL_VIDEOS":
      return { ...state, allVideos: action.payload };

    case "VIDEOS_BY_CATEGORY":
      return { ...state, categoryVideos: action.payload };
      
    case "CURRENT_VIDEO":
      return { ...state, currentVideo: action.payload };

    case "SELECT_CATEGORY":
      return {...state, category : action.payload}

    case "SEARCH_VIDEO":
      return { ...state, search: action.payload };

    default:
      return state;
  }
};
