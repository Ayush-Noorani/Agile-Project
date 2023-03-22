import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToastContext } from "../../../context/ToastContext";
import { axiosInstance } from "../../../helper/axios";
import { setFilter } from "../../../store/reducers/filters";
import { Plan } from "../../BackLog/hooks/useBackLog";

export const usePlan = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const { toast, defaultValue } = useToastContext();
  const dispatch = useDispatch();
  const [form, setForm] = useState<Plan>({
    startDate: new Date(),
    endDate: new Date(),
    planName: "",
    project: "",
  });
  useEffect(() => {
    getPlans();
  }, []);
  const updatePlanStatus = (data: any, status: Number | string) => {
    console.log(data);

    axiosInstance
      .post("/plan/status/" + status, {
        id: data.id,
        projectId: data.project,
      })
      .then((res) => {
        getPlans();
      })

      .catch((err) => {
        if (err.response?.data?.message) {
          console.log("HERE");
          toast.error(err.response?.data?.message, {
            ...defaultValue,
            theme: "light",
          });
        }
        console.error(err.response?.data?.message);
      });
  };
  const getPlans = (data?: any) => {
    let urlParams = "";
    if (data) {
      Object.entries(data).map(([key, value], index) => {
        urlParams += `${key}=${value}&`;
      });
      urlParams = "?" + urlParams.slice(0, -1);
    }
    axiosInstance
      .get("/plans/list" + urlParams)
      .then((res) => {
        console.log(res.data.plans);
        if (res.data.plans) {
          dispatch(
            setFilter({
              plan: res.data.plans[0].id,
            })
          );
          setPlans(res.data.plans);
        }
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

  return {
    plans,
    setPlans,
    getPlans,
    createPlan,
    updatePlanStatus,
    form,
    setForm,
  };
};
