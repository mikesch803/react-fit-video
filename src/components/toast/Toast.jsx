import React from "react";
import "./Toast.css"
import { useToast } from "../../context/toast-context";

export function Toast() {
  const { toastMsg, toastStyles } = useToast();
  return <div className={toastStyles}>{toastMsg}</div>;
}
