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

    case "EMAIL_ERR":
      return state.field.email.indexOf("@") === -1
        ? {
            ...state,
            emailErrState: true,
          }
        : { ...state, emailErrState: false };

    case "PASSWORD_ERR":
      return state.field.password.length < 8
        ? {
            ...state,
            passwordErrState: true,
          }
        : { ...state, passwordErrState: false };

    case "CONFIRM_PASSWORD_ERR":
      return state.field.confirmPassword !== state.field.password
        ? { ...state, confirmPasswordErrState: true }
        : { ...state, confirmPasswordErrState: false };

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
