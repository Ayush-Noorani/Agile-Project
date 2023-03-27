import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useDashboard } from "../hooks/useDashboard";
import { Tasks } from "../../../types/common";

const testData = [
  { taskName: "Task1", status: "inProgress", createdBy: "Jason" },
  { taskName: "Task2", status: "complete", createdBy: "Jason" },
  { taskName: "Task3", status: "inProgress", createdBy: "Jason" },
  { taskName: "Task4", status: "toDo", createdBy: "Jason" },
  { taskName: "Task5", status: "complete", createdBy: "Jason" },
  { taskName: "Task6", status: "inProgress", createdBy: "Jason" },
  { taskName: "Task7", status: "complete", createdBy: "Jason" },
  { taskName: "Task8", status: "inProgress", createdBy: "Jason" },
  { taskName: "Task9", status: "toDo", createdBy: "Jason" },
  { taskName: "Task10", status: "complete", createdBy: "Jason" },
];

const TaskList = () => {
  const { projects, dashboard } = useDashboard();

  return (
    <Paper
      component={Box}
      elevation={6}
      sx={{
        borderRadius: "20px",
        paddingY: "23px",
        paddingX: "10px",
        width: "100%",
        marginTop: "10px",
        height: "52%",
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Your Tasks
      </Typography>
      <TableContainer
        sx={{
          height: "90%",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              overflow: "auto",
            }}
          >
            {dashboard
              .map((project) =>
                Object.values(project.tasks).flatMap((value) => value)
              )
              .flatMap((value) => value)
              .map((row: Tasks, index) => {
                return (
                  <TableRow
                    key={index.toString()}
                    sx={{ "td, th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.taskName}
                    </TableCell>
                    <TableCell>
                      {row.status && <Chip label={row.status} />}
                    </TableCell>
                    <TableCell>
                      {/* <TaskPriorityIcon priority={row?.priority} /> */}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export { TaskList };
