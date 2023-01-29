import { useNavigate } from 'react-router-dom';
import React from "react";
import { axiosInstance } from "../helper/axios";

export const useRegister = () => {
  const navigate=useNavigate()
  const onSubmit = (
    value: any,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>,
    setError:Function
  ) => {
    setError("")
    setLoader(true);
    axiosInstance.post("/user/register", value).then((res) => {


        localStorage.setItem("token", res.data.token);
        navigate("/dashboard")
      
    })
    .catch((err) => {
      setError(err.response.data.message);
    }) 
     setLoader(false);
  };
  return { onSubmit };
};
