import { useState, useEffect } from "react";
import { axiosInstance, socket } from "../helper/axios";

export const useNotification = () => {
  const [notification, setNotification] = useState<any>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (socket.connected) {
        socket.emit("notification-list", localStorage.getItem("token"));
      }
    }, 15000);
    socket.on("notification", (data: any) => {
      setNotification(data);
    });
    return () => {
      clearInterval(interval);
    };
  }, [socket, setNotification]);

  const readNotification = () => {
    axiosInstance.get("/notification/read").catch((err) => console.error(err));
  };

  return {
    notification,
    readNotification,
  };
};
