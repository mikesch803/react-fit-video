import "./Toast.css";
import { useEffect } from "react";
import { useToast } from "../../context";
// import { useToast } from "../../hooks";
export function Toast() {
  const { removeToastHandler, toastList } = useToast()

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastList.length) {
        removeToastHandler(toastList[0]?.id);
      }
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [toastList]);

  return (
    <div className="toast">
      {toastList?.map((item) => (
        <li key={item.id}>
          <div className={` alert ${item.type}`}>
            {item.msg}
          </div>
        </li>
      ))}
    </div>
  );
}