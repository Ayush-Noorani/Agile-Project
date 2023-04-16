import { DragAndDrop } from "../../components/DragAndDrop";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Typography,
} from "@mui/material";
import { CloseOutlined, Create, Info } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useTask } from "./hooks/useTask";
import { useParams } from "react-router-dom";
import { TaskUtilityForm } from "./TaskUtilityForm";
import { ColumnForm } from "./components/ColumnForm";
import { TaskHeader } from "./components/TaskHeader";
import { usePlan } from "../Plan/hooks/usePlan";
import { colors } from "../../utils/Common";

export const TaskList = () => {
  const { id, planId } = useParams();
  const [open, setOpen] = useState(false);
  const { plans } = usePlan(id, planId);
  // useEffect(() => {
  //   getPlans({
  //     status: "1",
  //   });
  // }, []);
  const [openColumn, setOpenColumn] = useState(false);
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
        setSelectedTaskId(undefined);
      },
    },
    { icon: <Info />, name: "Project Details", onClick: () => setOpen(true) },

    { icon: <Info />, name: "Add Column", onClick: () => setOpenColumn(true) },
  ];

  const columnOrder = localStorage.getItem("columnOrder");
  const { tasks, updateSequence, column, filters, getTasks } = useTask(
    id,
    planId
  );
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>(
    undefined
  );

  const getExistingTask = (id: string) => {
    setSelectedTaskId(id);
    setOpen(true);
  };
  console.log(column, "column", tasks, Object.keys(tasks).length > 0);
  return (
    <Box
      style={{
        padding: 0,
        width: "100%",
        overflow: "auto",
        height: "100%",
      }}
    >
      <TaskUtilityForm
        closeModal={() => {
          setOpen(false);
          getTasks();
        }}
        taskId={selectedTaskId}
        setOpen={setOpen}
        open={open}
      />

      <Dialog open={openColumn} onClose={() => setOpenColumn(false)}>
        <ColumnForm id={id} />
      </Dialog>
      <TaskHeader planId={planId} id={id} plans={plans} />

      {tasks !== undefined && Object.keys(tasks).length > 0 && (
        <DragAndDrop
          data={tasks}
          columns={column}
          filters={filters}
          onClick={getExistingTask}
          planId={planId}
          onValueChange={(data) => {
            if (planId === undefined) {
              updateSequence(data);
            }
          }}
          order={columnOrder ? JSON.parse(columnOrder) : undefined}
        />
      )}
      {planId === undefined && (
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
