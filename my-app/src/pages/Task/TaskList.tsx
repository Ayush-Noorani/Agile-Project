import {
  Box,
  Dialog,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import { Create, ViewColumnSharp } from "@mui/icons-material";
import { useState, useMemo } from "react";
import { useTask } from "./hooks/useTask";
import { useParams } from "react-router-dom";
import { TaskUtilityForm } from "./TaskUtilityForm";
import { ColumnForm } from "./components/ColumnForm";
import { TaskHeader } from "./components/TaskHeader";
import { usePlan } from "../Plan/hooks/usePlan";
import { useUser } from "../../hooks/useUser";
import { DragAndDrop } from "../../components/DragAndDrop";

export const TaskList = () => {
  const { id, planId } = useParams();
  const [open, setOpen] = useState(false);
  const { plans } = usePlan(id, planId);
  // useEffect(() => {
  //   getPlans({
  //     status: "1",
  //   });
  // }, []);
  const { user } = useUser();
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
    //@ts-ignore
    user.roles.includes("admin") ||
    user.roles.includes("lead") ||
    user.roles.includes("manager")
      ? {
          icon: <ViewColumnSharp />,
          name: "Add Column",
          onClick: () => setOpenColumn(true),
        }
      : undefined,
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
  const taskView = useMemo(
    () =>
      tasks !== undefined &&
      Object.keys(tasks).length > 0 && (
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
      ),
    [tasks, column, filters]
  );
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

      <Dialog open={openColumn} sx={{}} onClose={() => setOpenColumn(false)}>
        <ColumnForm id={id} onClose={() => setOpenColumn(false)} />
      </Dialog>
      <TaskHeader planId={planId} id={id} plans={plans} />

      {taskView}
      {planId === undefined && (
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions
            .filter((value) => value !== undefined)
            .map((action) => (
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
