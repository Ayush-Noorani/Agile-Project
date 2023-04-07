import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { axiosInstance } from "../helper/axios";
import { setLoading, setUser } from "../redux/reducers/user";
import { RootState } from "../redux/store";

export const useUser = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const fetchUserInfo = () => {
    if (!user.userName) {
      axiosInstance
        .get("/user/info")
        .then((res) => {
          console.log(
            `%c ${"FETCH USER INFO"} \n`,
            `background:green; color: white;  font-weight: bold;`,
            res.data
          );
          dispatch(setUser(res.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return {
    user,
    fetchUserInfo,
  };
};
