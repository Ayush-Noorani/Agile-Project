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
import { useUser } from "../../hooks/useUser";
export const PlanList = () => {
  const { id } = useParams();
  const { getPlans, createPlan, plans, updatePlanStatus } = usePlan(id);
  const { user } = useUser();

  console.log("ye ek user hai", user.roles);
  console.log(plans);

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
    <Box className="box tertiary">
      <InputLabel
        sx={{
          fontWeight: "bold",
        }}
      >
        Plans
      </InputLabel>
      <TableContainer component={Paper} className="tertiary">
        <PlanTable plans={plans} onClick={handleChangePlanStatus} />
      </TableContainer>
      <PlanUtility open={open} setOpen={setOpen} />

      {(user.roles.includes("admin") ||
        user.roles.includes("lead") ||
        user.roles.includes("manager")) && (
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
      )}
    </Box>
  );
};
