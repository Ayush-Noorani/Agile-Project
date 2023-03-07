import React from "react";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import { useTask } from "../hooks/useTask";
import { onChange } from "../../../utils/Common";
import { Columntype, Headers, SortOrder } from "../../../types/common";
import DeleteIcon from "@mui/icons-material/Delete";
interface ColumnProps {
  id?: string;
}

const columnHeaders: Headers[] = [
  {
    id: "label",
    label: "Label",
  },
  {
    id: "value",
    label: "Value",
  },
  {
    id: "action",
    label: "Action",
  },
];

export const ColumnForm = ({ id }: ColumnProps) => {
  const {
    columns,
    newColumn,
    setNewColumn,
    saveColumns,
    updateColumns,
    deleteColumns,
  } = useTask(id);

  return (
    <Box sx={{ height: "400px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columnHeaders.map((header, index) => (
              <TableCell key={`colHeader${index}`} sx={{ fontWeight: "bold" }}>
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {columns.map((row: Columntype, index) => (
            <TableRow>
              <TableCell>{row.label}</TableCell>
              <TableCell>{row.value}</TableCell>

              <TableCell>
                <IconButton onClick={() => deleteColumns(index)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          height: "60%",
        }}
        m="s"
      >
        <TextField
          variant="filled"
          label="Column Label"
          size="small"
          InputLabelProps={{ shrink: true }}
          InputProps={{ disableUnderline: true }}
          sx={{ width: "350px" }}
          value={newColumn.label}
          multiline
          onChange={(e) => onChange(e.target.value, "label", setNewColumn)}
        />
        <TextField
          variant="filled"
          label="Column Value"
          size="small"
          InputLabelProps={{ shrink: true }}
          InputProps={{ disableUnderline: true }}
          sx={{ width: "350px" }}
          value={newColumn.value}
          multiline
          onChange={(e) => onChange(e.target.value, "value", setNewColumn)}
        />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            variant="contained"
            sx={{ width: "100px", marginRight: "10px" }}
            onClick={updateColumns}
          >
            Add
          </Button>
          <Button
            variant="contained"
            sx={{ width: "100px" }}
            onClick={saveColumns}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
