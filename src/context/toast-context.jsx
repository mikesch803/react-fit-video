import { createContext, useContext, useState } from "react";

import { v4 as uuid } from "uuid";
const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toastList, setToastList] = useState([]);
  const toastHandler = (msg, type) => {
    setToastList([...toastList, { id: uuid(), msg: msg, type: type }]);
  };

  const removeToastHandler = (id) => {
    const updatedToastList = toastList.filter((item) => item.id !== id);
    setToastList(updatedToastList);
  };

  return (
    <ToastContext.Provider
      value={{
        toastList,
        toastHandler,
        removeToastHandler,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);

export { ToastContext, ToastProvider, useToast };