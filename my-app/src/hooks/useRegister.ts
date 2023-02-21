import { useNavigate } from "react-router-dom";
import React from "react";
import { axiosInstance } from "../helper/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/reducers/user";

export const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (
    value: any,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>,
    setError: Function
  ) => {
    setError("");
    setLoader(true);
    axiosInstance
      .post("/user/register", value)
      .then((res) => {
        dispatch(
          setUser({
            username: value.username,
            email: value.email,
          })
        );

        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    setLoader(false);
  };
  return { onSubmit };
};
