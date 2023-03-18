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
        navigate("/home");
      })
      .catch((err) => {
        if (!err.response?.data?.message) {
          return toast.error("Server Error", {
            ...defaultValue,
            theme: "light",
          });
        }
        setError(err.response.data.message);
      });
    setLoader(false);
  };
  return { onSubmit };
};
