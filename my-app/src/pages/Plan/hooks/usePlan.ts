import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToastContext } from "../../../context/ToastContext";
import { axiosInstance } from "../../../helper/axios";
import { setFilter } from "../../../redux/reducers/filters";
import { Plan } from "../../../types/common";
import { useSockets } from "../../../hooks/useSockets";
import { useCommon } from "../../../hooks/useCommon";

export const usePlan = (id: any, planId?: string) => {
  const [plans, setPlans] = useState<any[]>([]);
  const { toast, defaultValue } = useToastContext();
  const [currentPlan, setCurrentPlan] = useState<any>();
  const { data } = useSockets("/plan-list", { id: id, status: "active" });
  const dispatch = useDispatch();
  const { setLoaderState } = useCommon();
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
    setLoaderState(true);
    let urlParams = "?";
    if (data) {
      Object.entries(data).map(([key, value], index) => {
        urlParams += `${key}=${value}&`;
      });
    }
    console.log(id, "plan");
    if (!id) {
      setLoaderState(false);

      return;
    }
    axiosInstance
      .get("/plans/list" + urlParams + "id=" + id)
      .then((res) => {
        console.log(
          `%cFETCH PLAN LIST\n`,
          `background:green; color: white;  font-weight: bold;`,
          res.data
        );

        if (res.data.plans.length > 0) {
          dispatch(
            setFilter({
              plan: res.data.plans[0].id,
            })
          );
          setPlans(res.data.plans);
          setCurrentPlan(
            res.data.plans.find((plan: Plan) => plan.status === "1")
          );
          setLoaderState(false);
        }
        else setLoaderState(false);
      })
      .catch((err) => {
        console.error(err);
        setLoaderState(false);
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
    plans: plans,
    form,
    currentPlan,
    setPlans,
    getPlans,
    createPlan,
    updatePlanStatus,
    setForm,
  };
};
