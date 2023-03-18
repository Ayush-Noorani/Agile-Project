import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../helper/axios";
import { setTask } from "../../../store/reducers/tasks";
import { RootState } from "../../../store/store";
import { Tasks } from "../../../types/common";

export const useBackLog = () => {
  const taskStore = useSelector((state: RootState) => state.tasks);

  const dispatch = useDispatch();
  const [tasks, setTasks] = useState<Tasks[]>(taskStore);
  const [form, setForm] = useState<{
    startDate: Date;
    endDate: Date;
    planName: string;
    project: string;
  }>({
    startDate: new Date(),
    endDate: new Date(),
    planName: "",
    project: "",
  });
  const [plans, setPlans] = useState<any[]>([]);
  useEffect(() => {
    console.log("HERe----");
    getALlTasks();
    getPlans();
  }, []);

  const getALlTasks = () => {
    axiosInstance
      .get("/task/all")
      .then((res) => {
        console.log(res.data);
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
        console.log(res.data);
        getALlTasks();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updatePlanStatus = (id: string, status: Number) => {
    axiosInstance
      .post("/plans/status/" + status, {
        id,
      })
      .then((res) => {
        console.log(res.data);
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
