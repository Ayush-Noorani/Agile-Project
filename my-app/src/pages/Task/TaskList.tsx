import { DragAndDrop } from "../../components/DragAndDrop";
import {
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
import { useTask } from "./hooks/useTasks";
import { useParams } from "react-router-dom";
import { CreateTaskView } from "./CreateTaskView";

interface TaskProps {}

export const TaskList = ({}: TaskProps) => {
  const { id } = useParams();
  const actions: {
    icon: JSX.Element;
    name: string;
    onClick?: Function;
  }[] = [
    { icon: <Create />, name: "Create Task", onClick: () => setOpen(true) },
    { icon: <Info />, name: "Project Details", onClick: () => setOpen(true) },
  ];

  const columnOrder = localStorage.getItem("columnOrder");
  const [open, setOpen] = useState(false);
  const { getTasks, tasks, updateSequence, getExistingTaskData, value } =
    useTask(id);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  useEffect(() => {
    getTasks();
  }, []);
  const getExistingTask = (id: string) => {
    setSelectedId(id);
    setOpen(true);
  };
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <DialogTitle>
          <Typography fontSize={30} fontWeight={"bold"}>
            Create Task
          </Typography>
        </DialogTitle>
        <DialogContent>
          <CreateTaskView taskId={selectedId} />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button onClick={() => {}}>Submit</Button>
        </DialogActions> */}
      </Dialog>
      {Object.keys(tasks).length > 0 && (
        <DragAndDrop
          data={tasks}
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
    </>
  );
};
