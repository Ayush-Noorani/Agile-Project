import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { axiosInstance } from "../helper/axios";
import { setUser } from "../store/reducers/user";
import { RootState } from "../store/store";
import { consoleStatement } from "../utils/Common";

export const useUser = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const fetchUserInfo = () => {
    axiosInstance
      .get("/user/info")
      .then((res) => {
        consoleStatement("FETCH USER INFO", "green", res.data);
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
