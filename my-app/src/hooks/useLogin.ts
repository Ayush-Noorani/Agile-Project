import React from "react";
import {axiosInstance} from "../helper/axios";
import { useNavigate } from "react-router-dom";
export const useLogin = () => {
  const navigate=useNavigate();
  
  const onSubmit = (
    value: any,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>,
    setError:Function
  ) => {
    setLoader(true);
    axiosInstance.post("/user/login", value).then((res) => {

      if (res.data.error) {
        setError(res.data.error);
      } else {
        localStorage.setItem("token", res.data.token);
        navigate("/home")
      }
    })
    setLoader(false);
  };
  return { onSubmit };
};
