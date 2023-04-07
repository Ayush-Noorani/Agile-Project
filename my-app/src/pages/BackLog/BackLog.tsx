import React, { useState } from "react";

import { useBackLog } from "./hooks/useBackLog";
import {
  Box,
  MenuItem,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import { TableContainer, Paper } from "@mui/material";
import { Tasks } from "../../types/common";
import { Create } from "@mui/icons-material";
import { CustomTable } from "./Components/CustomTable";
import { PlanUtility } from "../Plan/PlanUtility";
import { useParams } from "react-router-dom";
export const BackLog = () => {
  const { id } = useParams();
  const { tasks, plans, moveToPlan } = useBackLog(id!);

  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Tasks | null>(null); // state for the task currently selected in the menu
  const actions: {
    icon: JSX.Element;
    name: string;
    onClick?: Function;
  }[] = [
    {
      icon: <Create />,
      name: "Create Task",
      onClick: () => {
        setOpen(true);
      },
    },
  ];

  const handleMoveToPlan = (plan: string) => {
    if (selectedTask) {
      selectedTask.plan = plan;
      moveToPlan(plan, selectedTask.id);
    }
  };

  return (
    <TableContainer component={Paper}>
      <PlanUtility open={open} setOpen={setOpen} />

      <Box
        style={{
          overflow: "auto",
        }}
      >
        {plans.map((value) => (
          <CustomTable
            handleMoveToPlan={handleMoveToPlan}
            value={value}
            setSelectedTask={setSelectedTask}
            menuOptions={
              plans.length > 0
                ? [
                    ...plans.filter((item) => item.id !== value.id),
                    {
                      id: "backLog",
                      planName: "Back Log",
                    },
                  ].map((value: any) => (
                    <MenuItem onClick={() => handleMoveToPlan(value.id)}>
                      {value.planName}
                    </MenuItem>
                  ))
                : [<MenuItem>No plans found</MenuItem>]
            }
            filter={value.id}
            plans={plans}
            tasks={tasks}
          />
        ))}
      </Box>
      <CustomTable
        value={{
          planName: "Back Log",
          id: "backLog",
        }}
        setSelectedTask={setSelectedTask}
        plans={plans}
        tasks={tasks}
        handleMoveToPlan={handleMoveToPlan}
        menuOptions={[]}
      />

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
