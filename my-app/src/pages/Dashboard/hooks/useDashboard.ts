import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useToastContext } from "../../../context/ToastContext";
import { axiosInstance } from "../../../helper/axios";
import { setDashboard } from "../../../store/reducers/project";
import { setTask } from "../../../store/reducers/tasks";
import { RootState } from "../../../store/store";
import {
  DashBoard,
  Member,
  Plan,
  ProjectData,
  Tasks,
} from "../../../types/common";
import { consoleStatement } from "../../../utils/Common";

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
