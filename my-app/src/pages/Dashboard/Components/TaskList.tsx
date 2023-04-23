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
import React, { useMemo } from "react";
import { useDashboard } from "../hooks/useDashboard";
import { Tasks } from "../../../types/common";
import "../../../css/common.css";
import { colors } from "../../../utils/Common";
import { TaskPriorityIcon } from "../../../components/Common/TaskPriorityIcon";

const TaskList = () => {
  const { dashboard } = useDashboard();

  const taskList = useMemo(() => {
    return (
      dashboard
        .map((project) => Object.entries(project.tasks))

        .flatMap((value) => value)
        .map((row: any, _index) => {
          return row[1].map((task: Tasks) => ({
            ...task,
            status: row[0],
          }));
        })
        .flatMap((value) => value) || []
    );
  }, [dashboard]);

  return (
    <Paper
      component={Box}
      elevation={6}
      className="dark"
      sx={{
        borderRadius: "20px",
        paddingY: "23px",
        paddingX: "10px",
        marginTop: "10px",
        width: "96%",
        backgroundColor: colors.tertiary,
        height: "43vh",
        overflow: "auto",
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Your Tasks
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              overflow: "auto",
              height: "fit-content",
            }}
          >
            {taskList.map((row: Tasks, index) => {
              return (
                <TableRow
                  key={index.toString()}
                  sx={{ "td, th": { border: 0 } }}
                >
                  <TableCell scope="row">{row.taskName}</TableCell>
                  <TableCell>
                    {row.status && <Chip label={row.status} />}
                  </TableCell>
                  <TableCell>
                    <TaskPriorityIcon
                      hideText={true}
                      priority={row?.priority}
                    />
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
