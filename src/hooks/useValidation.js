import { useState } from "react";
export function useValidation() {
  const [errMsg, setErrMsg] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const formValidation = (email, password, confirmPassword) => {
    let errors = { ...errMsg };
    if (email && email.includes("@")) {
      errors = { ...errors, email: "" };
    } else {
      errors = { ...errors, email: "invalid email" };
    }
    if (password && password.length < 8) {
      errors = {
        ...errors,
        password: "password should be greater than 8 chars",
      };
    } else {
      errors = { ...errors, password: "" };
    }

    if (confirmPassword && confirmPassword !== password) {
      errors = { ...errors, confirmPassword: "pasword is should match" };
    } else {
      errors = { ...errors, confirmPassword: "" };
    }

    setErrMsg(errors);
  };

  return { formValidation, errMsg };
}
