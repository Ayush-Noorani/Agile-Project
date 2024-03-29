import { useEffect, useState } from "react";
import { axiosInstance } from "../../../helper/axios";
import { Plan } from "../../../types/common";

export const useRetroSpection = (id: string) => {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    getPlans();
  }, []);
  const getPlans = () => {
    console.log(
      `%c GET All INACTIVE Plan list \n`,
      `background:green; color: white;  font-weight: bold;`
    );
    axiosInstance
      .get(`/plans/list?status=inactive&id=${id}`)
      .then((res) => {
        console.log(res.data.plans);
        setPlans(res.data.plans);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return {
    plans,
    setPlans,
    getPlans,
  };
};
