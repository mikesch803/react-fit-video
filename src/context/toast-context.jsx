import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toastMsg, setToastMsg] = useState();
  const [toastStyles, setToastStyles] = useState();
  const [toastState, setToastState] = useState(false);
  return (
    <ToastContext.Provider value={{ toastMsg, setToastMsg, toastStyles, setToastStyles, toastState, setToastState }}>
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);

export { ToastContext, ToastProvider, useToast };
