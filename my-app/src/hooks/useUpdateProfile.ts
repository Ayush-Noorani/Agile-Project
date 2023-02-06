import React from "react";
import { axiosInstance } from "../helper/axios";
import { useNavigate } from "react-router-dom";

export const useUpdateProfile = () => {
  const navigate = useNavigate();

  const onSubmit = (
    value: any,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>,
    setError: Function
  ) => {
    setError("");
    setLoader(true);
    axiosInstance
      .post("/user/update-details", value)
      .then((res) => {
        navigate("/user-details");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    setLoader(false);
  };
  return { onSubmit };
};
