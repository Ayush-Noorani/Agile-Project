import { DragAndDrop } from "../../components/DragAndDrop";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField,
} from "@mui/material";
import { Create, Info } from "@mui/icons-material";
import { data } from "../../res/initial-data";
import { TaskForm } from "./TaskForm";
import { useState } from "react";

interface TaskProps {}

export const Task = ({}: TaskProps) => {
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
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <DialogTitle>Create a Task</DialogTitle>
        <DialogContent>
          <TaskForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button onClick={() => {}}>Submit</Button>
        </DialogActions>
      </Dialog>
      <DragAndDrop
        data={data}
        order={columnOrder ? JSON.parse(columnOrder) : undefined}
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
    </>
  );
};
