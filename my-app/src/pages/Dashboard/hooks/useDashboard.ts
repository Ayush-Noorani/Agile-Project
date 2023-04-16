import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../helper/axios";
import { setDashboard } from "../../../redux/reducers/project";
import { RootState } from "../../../redux/store";
import { DashBoard } from "../../../types/common";
import { useCommon } from "../../../hooks/useCommon";

export const useDashboard = () => {
  const dashboard = useSelector((state: RootState) => state.project.dashboard);
  const [projects, setProjects] = useState<DashBoard[]>(dashboard);
  const dispatch = useDispatch();
  const { setLoaderState } = useCommon();
  const getDashboardData = () => {
    setLoaderState(true);
    axiosInstance
      .get("/user/get-dashboard")
      .then((res) => {
        console.log(
          `%c ${"FETCH DASHBOARD DATA"} \n`,
          `background:green; color: white;  font-weight: bold;`,
          res.data
        );
        setLoaderState(false);
        dispatch(setDashboard(res.data.projects));
        setProjects(dashboard);
      })
      .catch((err) => {
        setLoaderState(false);

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
