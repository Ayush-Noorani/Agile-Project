import {
  Alert,
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
import TaskAltSharpIcon from "@mui/icons-material/TaskAltSharp";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";
import React from "react";

const testData = [
  { name: "Task1", status: "inProgress", createdBy: "Jason" },
  { name: "Task2", status: "complete", createdBy: "Jason" },
  { name: "Task3", status: "inProgress", createdBy: "Jason" },
  { name: "Task4", status: "toDo", createdBy: "Jason" },
  { name: "Task5", status: "complete", createdBy: "Jason" },
  { name: "Task6", status: "inProgress", createdBy: "Jason" },
  { name: "Task7", status: "complete", createdBy: "Jason" },
  { name: "Task8", status: "inProgress", createdBy: "Jason" },
  { name: "Task9", status: "toDo", createdBy: "Jason" },
  { name: "Task10", status: "complete", createdBy: "Jason" },
];

const TaskList = () => {
  return (
    <>
      <Paper
        component={Box}
        elevation={6}
        sx={{
          borderRadius: "20px",
          paddingY: "23px",
          paddingX: "10px",
          width: "100%",
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Your Tasks
        </Typography>
        <TableContainer sx={{ maxHeight: "430px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created By</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testData.map((row) => {
                var icon;
                var color: any;
                switch (row.status) {
                  case "complete":
                    icon = <TaskAltSharpIcon />;
                    color = "success";
                    break;
                  case "toDo":
                    icon = <InfoOutlinedIcon />;
                    color = "primary";
                    break;
                  case "inProgress":
                    icon = <AccessTimeSharpIcon />;
                    color = "warning";
                    break;
                }

                return (
                  <TableRow key={row.name} sx={{ "td, th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>
                      <Chip label={row.status} icon={icon} color={color} />
                    </TableCell>
                    <TableCell>{row.createdBy}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export { TaskList };
