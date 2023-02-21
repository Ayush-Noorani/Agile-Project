import React from "react";
import { axiosInstance } from "../../../helper/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/reducers/user";

export const useUpdateProfile = () => {
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const onSubmit = (
    value: any,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>,
    setError: Function
  ) => {
    setError("");
    setLoader(true);
    axiosInstance
      .post("/user/update-details", {
        username: value.username,
        passwod: value.password,
      })
      .then((_res) => {
        dispatch(
          setUser({
            ...userData,
            username: value.username,
          })
        );
        navigate("/user-details");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    setLoader(false);
  };
  return { onSubmit, userData };
};
