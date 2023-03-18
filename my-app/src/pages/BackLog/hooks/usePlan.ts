import { axiosInstance } from "../../../helper/axios";

export const usePlan = () => {
  const updatePlanStatus = (id: string, status: Number) => {
    axiosInstance
      .post("/plan/status/" + status, {
        id,
      })
      .then((res) => {
        console.log(res.data);
      })

      .catch((err) => {
        console.error(err);
      });
  };
  return {
    updatePlanStatus,
  };
};
