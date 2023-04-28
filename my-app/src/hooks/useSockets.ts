import { useState, useEffect } from "react";
import { axiosInstance, socket } from "../helper/axios";

export const useSockets = (path: string, params?: any, time?: number) => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const interval = setInterval(
      () => {
        if (socket.connected) {
          socket.emit(path, {
            ...params,
            token: localStorage.getItem("token"),
          });
        }
      },
      time ? time : 15000
    );
    socket.on(path.split("-")[0], (data: any) => {
      setData(data);
    });
    return () => {
      socket.disconnect();
      clearInterval(interval);
    };
  }, [socket, setData, path, params]);

  return {
    data,
    setData,
  };
};
