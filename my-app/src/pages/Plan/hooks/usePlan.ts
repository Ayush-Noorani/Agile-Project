import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToastContext } from "../../../context/ToastContext";
import { axiosInstance } from "../../../helper/axios";
import { setFilter } from "../../../redux/reducers/filters";
import { Plan } from "../../../types/common";

export const usePlan = (id: any, planId?: string) => {
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
    if (id) {
      getPlans();
    }
  }, []);
  const updatePlanStatus = (data: any, status: number | string) => {
    console.log(data);

    axiosInstance
      .post("/plan/status/" + status, {
        id: data.id,
        projectId: data.project,
      })
      .then((res) => {
        console.log(
          `%cCHANGE PLAN STATUS \n`,
          `background:green; color: white;  font-weight: bold;`,
          res.data
        );
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
    let urlParams = "?";
    if (data) {
      Object.entries(data).map(([key, value], index) => {
        urlParams += `${key}=${value}&`;
      });
    }
    axiosInstance
      .get("/plans/list" + urlParams + "id=" + id)
      .then((res) => {
        console.log(
          `%cFETCH PLAN LIST\n`,
          `background:green; color: white;  font-weight: bold;`,
          res.data
        );
        console.log(res.data.plans);
        if (res.data.plans.length > 0) {
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
        console.log(
          `%CREATE PLAN \n`,
          `background:green; color: white;  font-weight: bold;`,
          res.data
        );
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
