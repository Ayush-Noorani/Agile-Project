import React, { useState } from "react";
import {
  Box,
  InputLabel,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import { TableContainer, Paper } from "@mui/material";
import { Tasks } from "../../types/common";
import { Create } from "@mui/icons-material";
import { PlanUtility } from "../Plan/PlanUtility";
import { usePlan } from "./hooks/usePlan";
import { PlanTable } from "./Components/PlanTable";
import { useParams } from "react-router-dom";
export const PlanList = () => {
  const { id } = useParams();
  const { getPlans, createPlan, plans, updatePlanStatus } = usePlan(id);

  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Tasks | null>(null); // state for the task currently selected in the menu
  const actions: {
    icon: JSX.Element;
    name: string;
    onClick?: Function;
  }[] = [
    {
      icon: <Create />,
      name: "Create Plan",
      onClick: () => {
        setOpen(true);
      },
    },
  ];
  const handleChangePlanStatus = (row: any, status: string) => {
    updatePlanStatus(row, status);
    getPlans();
  };

  return (
    <TableContainer component={Paper}>
      <Box className="box">
        <InputLabel>Plans</InputLabel>
        <PlanTable plans={plans} onClick={handleChangePlanStatus} />
      </Box>
      <PlanUtility open={open} setOpen={setOpen} />

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            onClick={() => action.onClick && action.onClick()}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </TableContainer>
  );
};
