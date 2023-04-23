import { useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Autocomplete,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTask } from "../Task/hooks/useTask";
import { Member } from "../../types/common";
import { useParams } from "react-router-dom";
import { useProject } from "../Projects/hooks/useProject";
import { useCommon } from "../../hooks/useCommon";
import { TypoGraphyImage } from "../../components/Common/TypoGraphyImage";
import { colors } from "../../utils/Common";

interface User {
  id: number;
  username: string;
  email: string;
}

interface UserTableProps {
  users: User[];
}

export const Members = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { unAssign, fetchAllProjects, assign } = useProject();
  const { currentProject } = useTask(id);
  const autoCompplete = useRef<any>(null);
  const { members, searchUser } = useCommon();
  const handleRemoveUser = (user: Member) => {
    // TODO: Implement removal logic
    unAssign(currentProject?.id, user.id);
    fetchAllProjects();
  };

  const filteredUsers = currentProject?.members.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        className="margin"
        ref={autoCompplete}
        onChange={(e, newValue) => {
          if (newValue && newValue.id) {
            assign(currentProject?.id, newValue.id);
            fetchAllProjects();
            autoCompplete.current.value = "";
          }
        }}
        sx={{ width: 400 }}
        autoHighlight
        renderInput={(params) => (
          <TextField
            onChange={(e) => searchUser(e.target.value)}
            {...params}
            label="Members"
          />
        )}
        options={members
          .filter(
            (value) =>
              currentProject?.members.find((item) => item.id === value.id) ===
              undefined
          )
          .map((value, key) => ({
            ...value,
            label: value.username,
            value: value.id,
          }))}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box
            component="li"
            {...props}
            className="row"
            sx={{ alignItems: "center" }}
          >
            <TypoGraphyImage color={option.color} name={option.label} />
            <Typography sx={{ marginLeft: "10px" }}>{option.label}</Typography>
          </Box>
        )}
      />
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: colors.tertiary,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {" "}
              <TableCell>Id</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProject?.members.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <IconButton
                    color={"error"}
                    onClick={() => handleRemoveUser(user)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Members;
