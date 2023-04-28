import { useState, useEffect } from "react";
import { axiosInstance, socket } from "../helper/axios";
import { useSockets } from "./useSockets";

export const useNotification = () => {
  const [notification, setNotification] = useState<any>([]);
  const { data } = useSockets("notification-list");

  const getNotification = () => {
    axiosInstance
      .get("/notifications/list")
      .then((res) => {
        setNotification(res.data.notification);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getNotification();
  }, []);
  const readNotification = () => {
    axiosInstance.get("/notification/read").catch((err) => console.error(err));
  };

  console.log(data, notification, "notifivc");
  return {
    notification: data.length > 0 ? data : notification,
    readNotification,
  };
};
