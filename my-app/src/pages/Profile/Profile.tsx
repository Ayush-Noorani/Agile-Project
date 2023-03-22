import { Box, Button, Avatar, Alert, TextField, Fab } from "@mui/material";
import React, { ChangeEvent, useRef, useState } from "react";
import { useUpdateProfile } from "./hooks/useUpdateProfile";
import "../../css/profile.css";
import { onChange } from "../../utils/Common";
import { Role } from "../../types/common";
import { axiosInstance, baseURL } from "../../helper/axios";
import { Add } from "@mui/icons-material";

interface formFields {
  username: string;
  password: string;
  email: string;
  roles: Role[];
}

export const Profile = () => {
  const { onSubmit, userData, saveImage } = useUpdateProfile();
  const fileRef = useRef<any>(null);
  const [image, setImage] = useState<string>("");
  const reader = new FileReader();

  const [formFields, setFormFields] = useState<formFields>({
    username: userData.userName,
    password: "",
    email: userData.email,
    roles: userData.roles,
  });
  const handleImageUpload = (e: any) => {
    reader.readAsDataURL(e.target.files[0] as File);
    reader.addEventListener("load", () => {
      setImage(reader.result as string);
    });
    saveImage(e.target.files[0]);
  };

  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
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
          <div style={{ position: "relative" }}>
            <Avatar
              alt="profile image"
              src={`${baseURL}/image/profile/${userData.id}.png`}
              sx={{ width: 200, height: 200 }}
            />
            <Fab
              variant="circular"
              color="primary"
              size="small"
              onClick={() => fileRef.current.click()}
              style={{
                zIndex: 1,

                position: "absolute",
                bottom: "10px",
                right: "10px",
              }}
            >
              <Add />
            </Fab>
          </div>
          <Box className="flex_column">
            <h2 style={{ margin: "0" }}>{userData.userName}</h2>
            <p style={{ margin: "0" }}>{userData.email}</p>
          </Box>
        </Box>
        <input
          style={{ opacity: 0 }}
          type="file"
          onChange={handleImageUpload}
          ref={fileRef}
        />

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
            value={formFields.roles.join(", ")}
            id="outlined-basic"
            variant="outlined"
            disabled
          />
        </Box>
      </Box>
    </Box>
  );
};
