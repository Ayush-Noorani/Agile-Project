import axios from "axios";
import { io } from "socket.io-client";

export const baseURL = process.env.SERVER_URL || "http://localhost:8000";

export const axiosInstance = axios.create({
  baseURL: baseURL,
});

export const socket = io(baseURL);

axiosInstance.interceptors.request.use(async (config: any) => {
  if (["post", "get", "put", "delete"].includes(config.method)) {
    try {
      let token = await localStorage.getItem("token");
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Access-Control-Allow-Origin"] = "*";
    } catch (e) {
      console.log(e);
    }
    return config;
  }
});
