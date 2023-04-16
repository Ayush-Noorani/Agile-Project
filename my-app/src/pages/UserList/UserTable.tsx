import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  InputAdornment,
  TablePagination,
  TableSortLabel,
  TextField,
  Select,
  MenuItem,
  Stack,
  Button,
} from "@mui/material";
import { Add, Delete, PhoneEnabled, Search } from "@mui/icons-material";
import { Role, User } from "../../types/common";
import { Headers, SortOrder } from "../../types/common";
import { getcomparator, flipSortOrder } from "./utils/userListUtils";
import { useAdminMethods } from "./hooks/useAdminMethods";
import { roles } from "./utils/options";
import { colors } from "../../utils/Common";
import { useTable } from "../../hooks/useTable";

const columnHeaders: Headers[] = [
  {
    id: "username",
    label: "Username",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "roles",
    label: "Roles",
  },
];

export const UserTable = () => {
  const { data, updateUserRole, activateUser, deleteUser, deactivateUser } =
    useAdminMethods();

  const [sortBy, setSortBy] = React.useState<keyof User>("id");
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("asc");
  const [search, setSearch] = React.useState("");
  const {
    rowsPerPage,
    currentPage,
    handleChangeRowsPerPage,
    handleChangePage,
  } = useTable();
  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  // };

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setCurrentPage(newPage);
  // };

  const handleSort = (id: keyof User) => {
    if (id === sortBy) setSortOrder(flipSortOrder(sortOrder));
    else {
      setSortBy(id);
      setSortOrder("asc");
    }
  };

  const filterBySearch = (current: User) => {
    if (search !== "")
      return (
        current.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        current.email
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        current.id.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    else return true;
  };
  const emptyRows =
    currentPage > 0
      ? Math.max(0, (1 + currentPage) * rowsPerPage - data.length)
      : 0;

  const newRows = data.filter(filterBySearch);

  return (
    <TableContainer
      component={Paper}
      sx={{
        marginY: "15px",
        marginX: "10px",
        width: "98vw",
        alignSelf: "center",
        backgroundColor: colors.tertiary,
      }}
    >
      <TextField
        id="outlined-basic"
        label="Search"
        variant="standard"
        size="small"
        value={search}
        sx={{ marginY: "20px", marginX: "10px" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columnHeaders.map((header, index) => (
              <TableCell key={`colHeader${index}`} sx={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortBy === header.id}
                  direction={sortOrder}
                  onClick={() => {
                    handleSort(header.id);
                  }}
                >
                  {header.label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell key={`colHeader${999}`} sx={{ fontWeight: "bold" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newRows
            .sort(getcomparator(sortBy, sortOrder))
            .slice(
              currentPage * rowsPerPage,
              currentPage * rowsPerPage + rowsPerPage
            )
            .map((row) => {
              return (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {columnHeaders.map((item, index) =>
                    item.id === "name" ? (
                      <TableCell>{row[item.id as keyof User]}</TableCell>
                    ) : typeof row[item.id as keyof User] === "object" ? (
                      <TableCell>
                        <Select
                          multiple
                          value={row.roles}
                          onChange={(event) => {
                            updateUserRole(
                              row.id,
                              event.target.value as unknown as Role[]
                            );
                          }}
                        >
                          {roles.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                    ) : (
                      <TableCell size="small">
                        {row[item.id as keyof User]}
                      </TableCell>
                    )
                  )}
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="contained"
                        color={row?.active ? "warning" : "success"}
                        onClick={() =>
                          row?.active
                            ? deactivateUser(row.id)
                            : activateUser(row.id)
                        }
                      >
                        {row?.active ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        onClick={() => deleteUser(row.id)}
                        variant="contained"
                        color="error"
                      >
                        Delete
                      </Button>
                    </Stack>
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
        count={newRows.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};
