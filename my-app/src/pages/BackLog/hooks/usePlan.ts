import { axiosInstance } from "../../../helper/axios";

export const usePlan = () => {
  const updatePlanStatus = (data: any, status: Number) => {
    axiosInstance
      .post("/plan/status/" + status, {
        id: data.id,
        projectId: data.project,
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
