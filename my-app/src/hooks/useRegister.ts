import { useNavigate } from 'react-router-dom';
import React from "react";
import { axiosInstance } from "../helper/axios";

export const useRegister = () => {
  const navigate=useNavigate()
  const onSubmit = (
    value: any,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoader(true);
    axiosInstance.post("/user/register", value).then((res) => {

      if (res.data.error) {
        //setError(res.data.error);
      } else {
        localStorage.setItem("token", res.data.token);
        navigate("/home")
      }
    })   
     setLoader(false);
  };
  return { onSubmit };
};
