import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { axiosInstance } from "../helper/axios";
import { setUser } from "../store/reducers/user";
import { RootState } from "../store/store";

export const useUser = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const fetchUserInfo = () => {
    axiosInstance
      .get("/user/info")
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return {
    user,
    fetchUserInfo,
  };
};
