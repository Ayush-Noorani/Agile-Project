import React, { createContext, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type ToastContext = {
  toast: typeof toast;
  defaultValue: any;
};
const defaultValue = {
  position: "top-right",
  autoClose: 800,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};
const ToastContext = createContext<ToastContext>({
  toast,
  defaultValue,
});

export const ToastContextProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const values: ToastContext = {
    toast,
    defaultValue,
  };

  return (
    <ToastContext.Provider value={values}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => useContext(ToastContext);
