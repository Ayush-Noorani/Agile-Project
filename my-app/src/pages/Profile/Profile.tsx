import { Box, Button, Avatar, Alert, TextField, Fab } from "@mui/material";
import React, { useRef, useState } from "react";
import { useUpdateProfile } from "./hooks/useUpdateProfile";
import "../../css/profile.css";
import { colors, onChange } from "../../utils/Common";
import { Role } from "../../types/common";
import { Add } from "@mui/icons-material";
import { TypoGraphyImage } from "../../components/Common/TypoGraphyImage";
import { useUser } from "../../hooks/useUser";

interface formFields {
  username: string;
  password: string;
  email: string;
  roles: Role[];
  name: string;
}

export const Profile = () => {
  const { onSubmit, userData, setImage: saveImage } = useUpdateProfile();
  const fileRef = useRef<any>(null);
  const [image, setImage] = useState<string>("");
  const reader = new FileReader();
  const { user } = useUser();

  const [formFields, setFormFields] = useState<formFields>({
    username: user.userName,
    password: "",
    email: user.email,
    roles: user.roles,
    name: user.name,
  });
  const handleImageUpload = (e: any) => {
    reader.readAsDataURL(e.target.files[0] as File);
    reader.addEventListener("load", () => {
      setImage(reader.result as string);
    });
    new Compressor(e.target.files[0], {
      quality: 0.7,
      success: (compressedResult) => {
        saveImage(compressedResult);
      },
    });
  };

  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const resetState = () => {
    setError("");
    setLoading(false);
    setFormFields({
      username: user.userName,
      password: "",
      email: user.email,
      roles: user.roles,
      name: user.name,
    });
  };
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
      <Box className="picture_container primary"></Box>
      <Box
        className="flex_row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          marginTop: "9.5%",

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
            <TypoGraphyImage
              onClick={() => {}}
              name={user.name}
              color={user.color}
              sx={{
                width: "100px",
                height: "100px",
              }}
              url={user.img}
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
            <h2 style={{ margin: "0", color: "white" }}>{userData.userName}</h2>
            <h3 style={{ margin: "0" }}>{userData.email}</h3>
          </Box>
        </Box>
        <input
          style={{ opacity: 0 }}
          type="file"
          onChange={handleImageUpload}
          ref={fileRef}
        />

        <Box className="flex_row" gap={"10px"} style={{ overflow: "auto" }}>
          <Button
            sx={{
              backgroundColor: colors.primary,
            }}
            variant="contained"
            onClick={resetState}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              onSubmit(formFields, setLoading, setError);
            }}
            sx={{
              backgroundColor: colors.dark,
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
            label={"Name"}
            onChange={(e) => onChange(e.target.value, "name", setFormFields)}
            style={{
              width: "70%",
            }}
            id="outlined-basic"
            value={formFields.name}
            variant="outlined"
          />
        </Box>
        <Box className="profile_form_fields">
          <TextField
            label={"Password"}
            type="password"
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
