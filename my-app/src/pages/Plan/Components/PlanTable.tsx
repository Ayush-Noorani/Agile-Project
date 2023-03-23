import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  makeStyles,
} from "@mui/material";
import React from "react";
import { formatDateTime } from "../../../utils/Common";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Check } from "@mui/icons-material";
import { useCommon } from "../../../hooks/useCommon";
import { Plan } from "../../../types/common";

interface PlanTableProps {
  plans: Plan[];

  onClick: (row: any, status: string) => void;
}
export const PlanTable = ({ plans, onClick }: PlanTableProps) => {
  const { navigate } = useCommon();
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Plan Name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell align="center">Project Name</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plans.map((row) => {
            const [startFormatDate, startTime] = formatDateTime(
              new Date(row.startDate)
            );
            const [endFormatDate, endTime] = formatDateTime(
              new Date(row.endDate)
            );
            return (
              <TableRow key={row.planName}>
                <TableCell component="th" scope="row">
                  {row.planName}
                </TableCell>
                <TableCell>{startFormatDate}</TableCell>
                <TableCell>{startTime}</TableCell>
                <TableCell>{endFormatDate}</TableCell>
                <TableCell>{endTime}</TableCell>
                <TableCell align="center">{row.projectName}</TableCell>
                <TableCell align="center">
                  <Button
                    startIcon={<Check />}
                    onClick={() => onClick(row, "3")}
                    variant="outlined"
                    disabled={row.status === "3"}
                  >
                    {row.status !== "3" ? "Mark as completed" : "Completed"}
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      marginLeft: "5px",
                    }}
                    color={
                      row.status === "1"
                        ? "error"
                        : row.status === "2" || row.status === "0"
                        ? "success"
                        : "secondary"
                    }
                    disabled={row.status === "3"}
                    startIcon={
                      row.status === "1" ? (
                        <StopIcon />
                      ) : row.status === "2" || row.status === "0" ? (
                        <PlayArrowIcon />
                      ) : (
                        <></>
                      )
                    }
                    onClick={() => onClick(row, row.status === "1" ? "2" : "1")}
                  >
                    {row.status === "1"
                      ? "Stop"
                      : row.status === "2" || row.status === "0"
                      ? "Start"
                      : "ENDED"}
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      marginLeft: "5px",
                    }}
                    disabled={row.status === "0"}
                    onClick={() => {
                      navigate("/project/tasks/" + row.project);
                    }}
                  >
                    View Plan
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
