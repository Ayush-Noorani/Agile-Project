import { Box, Button, Avatar, Alert, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useUpdateProfile } from "./hooks/useUpdateProfile";
import "../../css/profile.css";
import { onChange } from "../../utils/Common";
import { Role } from "../../types/common";

interface formFields {
  username: string;
  password: string;
  email: string;
  phoneNumber: number;
  role: Role;
}

export const Profile = () => {
  const [formFields, setFormFields] = useState<formFields>({
    username: "",
    password: "",
    email: "",
    phoneNumber: 0,
    role: "user",
  });
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { onSubmit, userData } = useUpdateProfile();

  //Not required
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setFormFields((prevVal) => {
  //     return {
  //       ...prevVal,
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  // };

  //   const updateDetails = () => {

  //   }
  console.log(userData);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: "0px 120px",
        overflow: "auto",
        margin: "5px 0",
      }}
    >
      <Box className="picture_container"></Box>
      <Box
        className="flex_row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          marginTop: "18%",

          padding: "0 60px",
        }}
      >
        <Box
          className="flex_row"
          sx={{
            alignItems: "center",
            gap: "20px",
            marginTop: "5px",
          }}
        >
          <Avatar
            alt="profile image"
            src="https://loremflickr.com/320/240"
            sx={{ width: 200, height: 200 }}
          />
          <Box className="flex_column">
            <h2 style={{ margin: "0" }}>{userData.userName}</h2>
            <p style={{ margin: "0" }}>{userData.email}</p>
          </Box>
        </Box>
        <Box className="flex_row" gap={"10px"} style={{ overflow: "auto" }}>
          <Button variant="contained">Cancel</Button>
          <Button
            variant="outlined"
            onClick={() => {
              onSubmit(formFields, setLoading, setError);
            }}
            disabled={loading}
          >
            Save
          </Button>
        </Box>
      </Box>
      {error ? <Alert severity="error">{error}</Alert> : <></>}
      <Box className="column" style={{ justifyContent: "space-between" }}>
        <Box className="profile_form_fields">
          <TextField
            label={"Username"}
            onChange={(e) =>
              onChange(e.target.value, "username", setFormFields)
            }
            style={{
              width: "70%",
            }}
            id="outlined-basic"
            value={formFields.username}
            variant="outlined"
          />
        </Box>
        <Box className="profile_form_fields">
          <TextField
            label={"Password"}
            onChange={(e) =>
              onChange(e.target.value, "password", setFormFields)
            }
            style={{
              width: "70%",
            }}
            value={formFields.password}
            id="outlined-basic"
            variant="outlined"
          />
        </Box>
        <Box className="profile_form_fields">
          <TextField
            label={"Email"}
            style={{
              width: "70%",
            }}
            value={formFields.email}
            id="outlined-basic"
            variant="outlined"
            disabled
          />
        </Box>
        <Box className="profile_form_fields">
          <TextField
            label={"Role"}
            style={{
              width: "70%",
            }}
            value={formFields.role}
            id="outlined-basic"
            variant="outlined"
            disabled
          />
        </Box>
      </Box>
    </Box>
  );
};
