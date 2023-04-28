import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TablePagination,
} from "@mui/material";
import React from "react";
import { formatDateTime } from "../../../utils/Common";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Check } from "@mui/icons-material";
import { useCommon } from "../../../hooks/useCommon";
import { Plan } from "../../../types/common";
import { useTable } from "../../../hooks/useTable";
import { useUser } from "../../../hooks/useUser";
import { useTask } from "../../Task/hooks/useTask";

interface PlanTableProps {
  plans: Plan[];

  onClick: (row: any, status: string) => void;
}
export const PlanTable = ({ plans, onClick }: PlanTableProps) => {
  const { navigate } = useCommon();
  const { currentProject } = useTask();
  const { user } = useUser();
  const isProjectLead = currentProject?.lead === user?.id;
  const {
    rowsPerPage,
    currentPage,
    handleChangeRowsPerPage,
    handleChangePage,
  } = useTable();
  const emptyRows =
    currentPage > 0
      ? Math.max(0, (1 + currentPage) * rowsPerPage - plans.length)
      : 0;

  return (
    <TableContainer className="tertiary">
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
          {plans
            .slice(
              currentPage * rowsPerPage,
              currentPage * rowsPerPage + rowsPerPage
            )
            .map((row) => {
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
                      disabled={
                        row.status === "3" ||
                        row.status !== "1" ||
                        !user?.roles.includes("admin") ||
                        !user.roles.includes("manager") ||
                        !user.roles.includes("lead") ||
                        !isProjectLead
                      }
                      style={{
                        whiteSpace: "initial",
                      }}
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
                      disabled={
                        row.status === "3" ||
                        !user?.roles.includes("admin") ||
                        !user.roles.includes("manager") ||
                        !isProjectLead
                      }
                      startIcon={
                        row.status === "1" ? (
                          <StopIcon />
                        ) : row.status === "2" || row.status === "0" ? (
                          <PlayArrowIcon />
                        ) : (
                          <></>
                        )
                      }
                      onClick={() =>
                        onClick(row, row.status === "1" ? "2" : "1")
                      }
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
                        navigate(
                          "/project/tasks/" + row.project + "/" + row.id
                        );
                      }}
                    >
                      View Plan
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: 72 * emptyRows,
              }}
            >
              <TableCell colSpan={5} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={plans.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};
