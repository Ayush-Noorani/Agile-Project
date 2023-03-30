import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../helper/axios";
import { setDashboard } from "../../../redux/reducers/project";
import { RootState } from "../../../redux/store";
import {
  DashBoard,
} from "../../../types/common";

export const useDashboard = () => {
  const dashboard = useSelector((state: RootState) => state.project.dashboard);
  const [projects, setProjects] = useState<DashBoard[]>(dashboard);
  const dispatch = useDispatch();
  useEffect(() => {
    setProjects(dashboard);
  }, []);
  const getDashboardData = () => {
    axiosInstance
      .get("/user/get-dashboard")
      .then((res) => {
        console.log(
          `%c ${"FETCH DASHBOARD DATA"} \n`,
          `background:green; color: white;  font-weight: bold;`,
          res.data
        );
        dispatch(setDashboard(res.data.projects));
        setProjects(dashboard);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return {
    projects,
    dashboard,
    setProjects,
    getDashboardData,
  };
};
