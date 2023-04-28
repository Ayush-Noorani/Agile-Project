import { useState, useEffect } from "react";
import { axiosInstance, socket } from "../helper/axios";
import { useSockets } from "./useSockets";

export const useNotification = () => {
  const [notification, setNotification] = useState<any>([]);
  const { data } = useSockets("notification-list");

  const getNotification = () => {
    axiosInstance
      .get("/notification/list")
      .then((res) => {
        setNotification(res.data.notification);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      getNotification();
    }, 15000);

    return () => {
      clearInterval(interval);
    };
  }, [getNotification]);
  const readNotification = () => {
    axiosInstance.get("/notification/read").catch((err) => console.error(err));
  };

  return {
    notification: data.length > 0 ? data : notification,
    readNotification,
  };
};
