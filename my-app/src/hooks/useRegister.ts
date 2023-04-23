import { useNavigate } from "react-router-dom";
import React from "react";
import { axiosInstance } from "../helper/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/user";
import { useToastContext } from "../context/ToastContext";
import { generateRandomColor } from "../helper/common";

export const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast, defaultValue } = useToastContext();

  const onSubmit = (
    value: any,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>,
    setError: Function
  ) => {
    setError("");
    setLoader(true);
    delete value.confirmPassword;
    const randomColour = generateRandomColor();
    axiosInstance
      .post("/user/register", {
        ...value,
        color: randomColour,
      })
      .then((res) => {
        dispatch(
          setUser({
            username: value.username,
            email: value.email,
            roles: ["user"],
            img: "",
            color: randomColour,
            id: res.data.insertedID,
          })
        );
        // dispatch(setUser(value));
        localStorage.setItem("token", res.data.token);
        navigate("/my-dashboard");
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
