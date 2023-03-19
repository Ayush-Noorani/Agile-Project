import { Tasks } from "../../../types/common";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";
import { MenuComponent } from "../../../components/MenuComponent";

interface TableProps {
  tasks: Tasks[];
  menuOptions: any[];
  filter: string;
  setSelectedTask: (task: Tasks | null) => void;
}
export const TableComponent = ({
  tasks,
  menuOptions,
  filter,
  setSelectedTask,
}: TableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // state for the anchor element of the menu
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    task: Tasks
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Assignee</TableCell>
            <TableCell>Report To</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Section</TableCell>
            <TableCell>Plan</TableCell>
            <TableCell>Actions</TableCell>{" "}
            {/* added a new column for the actions menu */}
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks
            .filter((value) => value.plan === filter)
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.taskName}</TableCell>
                <TableCell>{task.assignee.length}</TableCell>
                <TableCell>{task.reportTo.length}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.section ?? "-"}</TableCell>
                <TableCell>
                  {task.plan == "backLog"
                    ? "Back Log"
                    : task.plan
                    ? task.plan
                    : "-"}
                </TableCell>
                <TableCell>
                  {/* added a new button to open the menu */}
                  <Button onClick={(event) => handleMenuOpen(event, task)}>
                    Move to plan
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <MenuComponent
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        menuOptions={menuOptions}
      />
    </TableContainer>
  );
};
