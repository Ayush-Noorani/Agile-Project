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
    setError("")

    setLoader(true);
    axiosInstance.post("/user/login", value).then((res) => {


        localStorage.setItem("token", res.data.token);
        navigate("/dashboard")
      
    }).catch((err) => {
      setError(err.response.data.message);
    })
    setLoader(false);
  };
  return { onSubmit };
};
