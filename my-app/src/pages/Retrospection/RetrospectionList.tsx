import { Box, InputLabel } from "@mui/material";
import { useParams } from "react-router-dom";
import { PlanTable } from "../Plan/Components/PlanTable";
import { useRetroSpection } from "./hooks/useRetroSpection";

interface RetrospectionProps {}
export const RetrospectionList = () => {
  const { id } = useParams();

  const { plans, getPlans } = useRetroSpection(id!);

  return (
    <Box
      className="box"
      sx={{
        width: "100%",
      }}
    >
      <InputLabel>Plans</InputLabel>
      <PlanTable plans={plans} onClick={() => {}} />
    </Box>
  );
};