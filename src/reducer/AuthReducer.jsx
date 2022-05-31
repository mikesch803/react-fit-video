export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FIELD":
      return {
        ...state,
        field: {
          ...state.field,
          [action.payload.name]: action.payload.value,
        },
      };

    case "USER_STATE":
      return {
        ...state,
        userState: !state.userState,
      };

    case "CHANGE_TYPE":
      return state.passwordType === "text"
        ? {
            ...state,
            passwordType: "password"
          }
        : {
            ...state,
            passwordType: "text"
          };

    default:
      return state;
  }
};
