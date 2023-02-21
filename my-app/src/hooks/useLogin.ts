import React from "react";
import { axiosInstance } from "../helper/axios";
import { useNavigate } from "react-router-dom";
import { useToastContext } from "../context/ToastContext";
import { useDispatch } from "react-redux";
import { setUser } from "../store/reducers/user";
export const useLogin = () => {
  const navigate = useNavigate();
  const { toast, defaultValue } = useToastContext();
  const dispatch = useDispatch();
  const onSubmit = (
    value: any,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>,
    setError: Function
  ) => {
    setError("");

    setLoader(true);
    axiosInstance
      .post("/user/login", value)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(setUser(res.data));
        toast("Logged in", defaultValue);
        navigate("/dashboard");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    setLoader(false);
  };
  return { onSubmit };
};
