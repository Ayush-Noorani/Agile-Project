import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useToastContext } from "../../../context/ToastContext";
import { axiosInstance } from "../../../helper/axios";
import { setTask } from "../../../store/reducers/tasks";
import { RootState } from "../../../store/store";
import { Plan, Tasks } from "../../../types/common";
import { consoleStatement } from "../../../utils/Common";

export const useBackLog = (id: string) => {
  const taskStore = useSelector((state: RootState) => state.tasks);

  const dispatch = useDispatch();
  const [tasks, setTasks] = useState<Tasks[]>(taskStore);
  const [form, setForm] = useState<Plan>({
    startDate: new Date(),
    endDate: new Date(),
    planName: "",

    project: "",
  });
  const { defaultValue, toast } = useToastContext();
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
      .get(`/plans/list?status=active&&id=${id}`)
      .then((res) => {
        console.log(
          `%c GET All ACTIVE PLAN LIST \n`,
          `background:green; color: white;  font-weight: bold;`,
          res.data
        );
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
        console.log(
          `%c CREATE PLAN \n`,
          `background:green; color: white;  font-weight: bold;`,
          res.data
        );
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
        console.log(
          `%c POST MOVE PLAN" \n`,
          `background:green; color: white;  font-weight: bold;`,
          res.data
        );
        getALlTasks();
      })
      .catch((err) => {
        console.error(err);
        if (err?.reponse?.message) {
          console.log(
            `%c POST MOVE PLAN" \n`,
            `background:green; color: white;  font-weight: bold;`,
            err.reponse.message
          );
          toast.error(err.reponse.message, defaultValue);
        }
      });
  };

  const updatePlanStatus = (data: any, status: any) => {
    console.log(
      `%c UPDATE PLAN STATUS \n`,
      `background:green; color: white;  font-weight: bold;`
    );
    axiosInstance
      .post("/plan/status/" + status, {
        id: data.id,
        projectId: data.project,
      })
      .then((res) => {
        console.log(res.data);
        getPlans();
      })

      .catch((err) => {
        if (err?.response?.data?.message) {
          console.log(
            `%c  ERROR: UPDATE PLAN STATUS \n`,
            `background:red; color: white;  font-weight: bold;`,
            err.response.data.message
          );
          toast.error(err.response.data.message, defaultValue);
        }
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
