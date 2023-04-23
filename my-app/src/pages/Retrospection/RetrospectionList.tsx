import { Box, InputLabel } from "@mui/material";
import { useParams } from "react-router-dom";
import { PlanTable } from "../Plan/Components/PlanTable";
import { useRetroSpection } from "./hooks/useRetroSpection";

export const RetrospectionList = () => {
  const { id } = useParams();

  const { plans, getPlans } = useRetroSpection(id!);

  return (
    <Box
      className="box tertiary"
      sx={{
        width: "96%",
      }}
    >
      <InputLabel
        sx={{
          fontWeight: "bold",
        }}
      >
        Retrospective Plans
      </InputLabel>
      <PlanTable plans={plans} onClick={() => {}} />
    </Box>
  );
};
