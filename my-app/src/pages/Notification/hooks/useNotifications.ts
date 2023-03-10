import { useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../helper/axios";
import { RootState } from "../../../store/store";

export const useNotifcation = () => {
  const notification = useSelector((state: RootState) => state.notification);
  const [data, setData] = useState<Notification[]>(
    notification as unknown as Notification[]
  );

  const fetchNotifications = () => {
    axiosInstance
      .get("/notifications/list")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeStatusToRead = () => {
    axiosInstance.get("/notifications/read").catch((err) => {
      console.log(err);
    });
  };

  return {
    data,
    setData,
    fetchNotifications,
    changeStatusToRead,
  };
};
