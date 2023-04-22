import React, { useMemo } from "react";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useTask } from "../hooks/useTask";
import { colors, onChange } from "../../../utils/Common";
import { Columntype, Headers } from "../../../types/common";
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
  {
    id: "color",
    label: "Color",
  },
];

export const ColumnForm = ({ id }: ColumnProps) => {
  const {
    column: columns,
    newColumn,
    setNewColumn,
    saveColumns,
    setColumn,
    updateColumns,
    deleteColumns,
  } = useTask(id);
  const table = useMemo(
    () => (
      <Table
        component={Paper}
        sx={{
          minWidth: 650,
          backgroundColor: colors.tertiary,
        }}
        aria-label="simple table"
      >
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
                <input
                  type="color"
                  onChange={(e) =>
                    setColumn((prev) =>
                      prev.map((value, pos) => {
                        if (pos === index) {
                          return {
                            ...value,
                            color: e.target.value,
                          };
                        }
                        return value;
                      })
                    )
                  }
                  value={row.color}
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => deleteColumns(index)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ),
    [columns]
  );
  return (
    <Stack
      spacing={2}
      sx={{
        height: "100%",
        overflow: "hidden",
        padding: "20px",
        backgroundColor: colors.tertiary,
      }}
    >
      {table}
      <Stack m="s" spacing={2} alignItems="center">
        {newColumn?.fixed && <Alert>Can only edit label and not value</Alert>}

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
          disabled={newColumn?.fixed}
          multiline
          onChange={(e) => onChange(e.target.value, "value", setNewColumn)}
        />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            variant="contained"
            sx={{
              width: "100px",
              marginRight: "10px",
              backgroundColor: colors.secondary,
            }}
            onClick={updateColumns}
          >
            Add
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "100px",
              backgroundColor: colors.secondary,
            }}
            onClick={saveColumns}
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};
