import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../helper/axios";
import { setTask } from "../../../store/reducers/tasks";
import { RootState } from "../../../store/store";
import { Tasks } from "../../../types/common";
export type Plan = {
  startDate: Date;
  endDate: Date;
  planName: string;
  project: string;
};
export const useBackLog = () => {
  const taskStore = useSelector((state: RootState) => state.tasks);

  const dispatch = useDispatch();
  const [tasks, setTasks] = useState<Tasks[]>(taskStore);
  const [form, setForm] = useState<Plan>({
    startDate: new Date(),
    endDate: new Date(),
    planName: "",
    project: "",
  });
  const [plans, setPlans] = useState<any[]>([]);
  useEffect(() => {
    getALlTasks();
    getPlans();
  }, []);

  const getALlTasks = () => {
    axiosInstance
      .get("/task/all")
      .then((res) => {
        dispatch(setTask(res.data.data));
        setTasks(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getPlans = () => {
    axiosInstance
      .get("/plans/list")
      .then((res) => {
        console.log(res.data);
        setPlans(res.data.plans);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const createPlan = () => {
    axiosInstance
      .post("/plans/create", form)
      .then((res) => {
        console.log(res.data);
        getPlans();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const moveToPlan = (id: string, taskId: string) => {
    axiosInstance
      .post("/task/move", {
        taskId,
        plan: id,
      })
      .then((res) => {
        getALlTasks();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updatePlanStatus = (data: any, status: any) => {
    axiosInstance
      .post("/plan/status/" + status, {
        id: data.id,
        projectId: data.project,
      })
      .then((res) => {
        getPlans();
      })

      .catch((err) => {
        console.error(err);
      });
  };
  return {
    tasks,
    plans,
    form,
    setForm,
    moveToPlan,
    createPlan,
    getPlans,
    setTasks,
    updatePlanStatus,
    getALlTasks,
  };
};
