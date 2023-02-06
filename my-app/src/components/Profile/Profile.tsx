import { Box, Button, Avatar, Alert } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import "../../css/profile.css";

interface formFields {
  username: string;
  password: string;
  email: string;
  phoneNumber: number;
}

export const Profile = () => {
  const [formFields, setFormFields] = useState<formFields>({
    username: "",
    password: "",
    email: "",
    phoneNumber: 0,
  });
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { onSubmit } = useUpdateProfile();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormFields((prevVal) => {
      return {
        ...prevVal,
        [e.target.name]: e.target.value,
      };
    });
  };

  //   const updateDetails = () => {

  //   }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: "0px 120px",
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
            marginTop: '5px'
          }}
        >
          <Avatar
            alt="profile image"
            src="https://loremflickr.com/320/240"
            sx={{ width: 200, height: 200}}
          />
          <Box className="flex_column">
            <h2 style={{ margin: "0" }}>Profile</h2>
            <p style={{ margin: "0" }}>Lorem ipsum</p>
          </Box>
        </Box>
        <Box className="flex_row" gap={"10px"}>
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
      <Box className="fields_container" >
        <Box className="profile_form_fields">
          <label className="label">Username</label>
          <input
            className="inputField"
            type="text"
            name="username"
            onChange={handleChange}
          />
        </Box>
        <Box className="profile_form_fields">
          <label className="label">Password</label>
          <input
            className="inputField"
            type="text"
            name="password"
            onChange={handleChange}
          />
        </Box>
        <Box className="profile_form_fields">
          <label className="label">Email</label>
          <input
            className="inputField"
            type="text"
            name="email"
            value={""}
            disabled
          />
        </Box>
        <Box className="profile_form_fields">
          <label className="label">Role</label>
          <input
            className="inputField"
            type="text"
            name="role"
            value={""}
            disabled
          />
        </Box>
      </Box>
    </Box>
  );
};
