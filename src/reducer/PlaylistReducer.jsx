export const playlistReducer = (state, action) => {
    switch (action.type) {
      case "INPUT_STATE":
        return { ...state, inputState: !state.inputState };
      case "VIDEOS_IN_PLAYLIST":
        return {
          ...state,
          videosInPlaylist: action.payload,
        };

      case "PLAYLISTS":
        return { ...state, allPlaylist: action.payload };
      case "ADD_TITLE_DESCRIPTION":
        return {
          ...state,
          field: {
            ...state.field,
            [action.payload.name]: action.payload.value,
          },
        };
      case "CURRENT_PLAYLIST":
        return { ...state, currentPlaylist: action.payload };

      case "UPDATE_PLAYLIST":
        return {
          ...state,
          allPlaylist: [...state.allPlaylist].map((item) =>
            item._id === action.payload._id ? action.payload : item
          ),
        };

      case "DELETE_PLAYLIST":
        return { ...state, currentPlaylist: {} };

      default:
        return state;
    }
  };