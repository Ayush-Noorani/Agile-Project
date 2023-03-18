import { DragAndDrop } from "../../components/DragAndDrop";
import {
  Box,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography,
} from "@mui/material";
import { Create, Info } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useTask } from "./hooks/useTask";
import { useParams } from "react-router-dom";
import { TaskUtility } from "./TaskUtilityForm";
import { ColumnForm } from "./components/ColumnForm";
import { TaskHeader } from "./components/TaskHeader";

interface TaskProps {}

export const TaskList = ({}: TaskProps) => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
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

  const {
    getTasks,
    tasks,
    updateSequence,
    getExistingTaskData,
    value,
    columns,
    filters,
  } = useTask(id);
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    getTasks();
  }, []);
  const getExistingTask = (id: string) => {
    setSelectedTaskId(id);
    setOpen(true);
  };
  console.log(tasks);
  return (
    <Box
      style={{
        padding: 0,
      }}
    >
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <DialogTitle>
          <Typography fontSize={30} fontWeight={"bold"}>
            {selectedTaskId ? "Update Task" : "Create Task"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TaskUtility taskId={selectedTaskId} />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button onClick={() => {}}>Submit</Button>
        </DialogActions> */}
      </Dialog>
      <Dialog open={openColumn} onClose={() => setOpenColumn(false)}>
        <ColumnForm id={id} />
      </Dialog>
      <TaskHeader id={id!} />
      {Object.keys(tasks).length > 0 && (
        <DragAndDrop
          data={tasks}
          columns={columns}
          filters={filters}
          onClick={getExistingTask}
          onValueChange={(data) => updateSequence(data)}
          order={columnOrder ? JSON.parse(columnOrder) : undefined}
        />
      )}
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
    </Box>
  );
};
