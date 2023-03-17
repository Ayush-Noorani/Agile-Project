import React, { useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export const BackLog = () => {
  const [toDoTasks, setToDoTasks] = useState([
    { id: 1, title: "Task 1", description: "" },
    { id: 2, title: "Task 2", description: "" },
  ]);
  const [inProgressTasks, setInProgressTasks] = useState<any[]>([]);
  const [inReviewTasks, setInReviewTasks] = useState<any[]>([]);
  const [doneTasks, setDoneTasks] = useState<any[]>([]);

  const handleDeleteTask = (taskId: number, section: string) => {
    switch (section) {
      case "ToDo":
        setToDoTasks(toDoTasks.filter((task) => task.id !== taskId));
        break;
      case "InProgress":
        setInProgressTasks(
          inProgressTasks.filter((task) => task.id !== taskId)
        );
        break;
      case "InReview":
        setInReviewTasks(inReviewTasks.filter((task) => task.id !== taskId));
        break;
      case "Done":
        setDoneTasks(doneTasks.filter((task) => task.id !== taskId));
        break;
      default:
        break;
    }
  };

  const handleMoveTask = (
    taskId: number,
    section: string,
    direction: string
  ) => {
    switch (section) {
      case "ToDo":
        setToDoTasks(toDoTasks.filter((task) => task.id !== taskId));
        if (direction === "Right") {
          setInProgressTasks([
            ...inProgressTasks,
            { id: taskId, title: `Task ${taskId}`, description: "" },
          ]);
        }
        break;
      case "InProgress":
        setInProgressTasks(
          inProgressTasks.filter((task) => task.id !== taskId)
        );
        if (direction === "Left") {
          setToDoTasks([
            ...toDoTasks,
            { id: taskId, title: `Task ${taskId}`, description: "" },
          ]);
        } else {
          setInReviewTasks([
            ...inReviewTasks,
            { id: taskId, title: `Task ${taskId}`, description: "" },
          ]);
        }
        break;
      case "InReview":
        setInReviewTasks(inReviewTasks.filter((task) => task.id !== taskId));
        if (direction === "Left") {
          setInProgressTasks([
            ...inProgressTasks,
            { id: taskId, title: `Task ${taskId}`, description: "" },
          ]);
        } else {
          setDoneTasks([
            ...doneTasks,
            { id: taskId, title: `Task ${taskId}`, description: "" },
          ]);
        }
        break;
      case "Done":
        setDoneTasks(doneTasks.filter((task) => task.id !== taskId));
        if (direction === "Left") {
          setInReviewTasks([
            ...inReviewTasks,
            { id: taskId, title: `Task ${taskId}`, description: "" },
          ]);
        }
        break;
      default:
        break;
    }
  };

  const renderTasks = (tasks: any[], sectionTitle: string) => {
    return (
      <>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText primary={task.title} secondary={task.description} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteTask(task.id, sectionTitle)}
              >
                <DeleteIcon />
              </IconButton>
              {sectionTitle === "ToDo" && (
                <IconButton
                  edge="end"
                  aria-label="move right"
                  onClick={() => handleMoveTask(task.id, sectionTitle, "Right")}
                >
                  <AddIcon />
                </IconButton>
              )}
              {sectionTitle !== "Done" && (
                <IconButton
                  edge="end"
                  aria-label="move right"
                  onClick={() => handleMoveTask(task.id, sectionTitle, "Right")}
                >
                  <AddIcon />
                </IconButton>
              )}
              {sectionTitle !== "ToDo" && (
                <IconButton
                  edge="end"
                  aria-label="move left"
                  onClick={() => handleMoveTask(task.id, sectionTitle, "Left")}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </>
    );
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        Backlog
      </Typography>
      <List>
        <Typography variant="h5" gutterBottom>
          To Do
        </Typography>
        {renderTasks(toDoTasks, "ToDo")}
        <Typography variant="h5" gutterBottom>
          In Progress
        </Typography>
        {renderTasks(inProgressTasks, "InProgress")}
        <Typography variant="h5" gutterBottom>
          In Review
        </Typography>
        {renderTasks(inReviewTasks, "InReview")}
        <Typography variant="h5" gutterBottom>
          Done
        </Typography>
        {renderTasks(doneTasks, "Done")}
      </List>
    </Container>
  );
};
