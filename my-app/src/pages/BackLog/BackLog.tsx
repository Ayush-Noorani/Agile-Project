import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { useBackLog } from "./hooks/useBackLog";
import {
  Box,
  Button,
  InputLabel,
  Menu,
  MenuItem,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Tasks } from "../../types/common";
import { TableComponent } from "./Components/TableComponent";
import { Create } from "@mui/icons-material";
import { CustomTable } from "./Components/CustomTable";
import { PlanUtility } from "../Plan/PlanUtility";
export const BackLog = () => {
  const { tasks, setTasks, getALlTasks, plans, moveToPlan } = useBackLog();
  useEffect(() => {
    console.log(plans);
  }, [plans]);
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
      <Box className="box">
        <InputLabel>Back Log</InputLabel>
        {tasks.length > 0 && (
          <TableComponent
            filter={"backLog"}
            setSelectedTask={setSelectedTask}
            menuOptions={plans.map((value: any) => (
              <MenuItem onClick={() => handleMoveToPlan(value.id)}>
                {value.planName}
              </MenuItem>
            ))}
            tasks={tasks}
          />
        )}
      </Box>
      <PlanUtility open={open} setOpen={setOpen} />
      <Box
        className="box"
        style={{
          height: "60%",
        }}
      >
        <InputLabel>Existing Plans</InputLabel>

        <Box
          style={{
            height: "90%",
            overflow: "auto",
          }}
        >
          {plans.map((value, key) => (
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
      </Box>
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
