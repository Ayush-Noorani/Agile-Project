import React, { useState } from "react";
import { FormType } from "../../types/common";
import { onChange } from "../../utils/Common";
import { Alert, Box, Button, Container, TextField } from "@mui/material";
import { useLogin } from "../../hooks/useLogin";
import "../../css/common.css";
import { useToastContext } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";

const form: FormType[] = [
  {
    label: "Email or Username",
    type: "email",
    name: "name",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
  },
];

type Form = {
  name: string;
  password: string;
};
export const Login = () => {
  const [value, setValue] = useState<Form>({
    name: "",
    password: "",
  });
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { onSubmit } = useLogin();
  const { toast } = useToastContext();
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <Box
        className="formbg"
        sx={{
          height: "35%",
          width: "50%",
          display: "flex",
          borderRadius: "20px",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <h4 style={{ alignSelf: "center" }}>Login</h4>
        {form.map((item, index) => (
          <TextField
            id="filled-basic"
            label={item.label}
            value={value[item.name as keyof Form]}
            onChange={(e: { target: { value: any } }) =>
              onChange(e.target.value, item.name, setValue)
            }
            variant="outlined"
          />
        ))}

        {error ? <Alert severity="error">{error}</Alert> : <></>}
        <Button
          disabled={loading}
          onClick={() => {
            onSubmit(value, setLoading, setError);
          }}
          variant="contained"
        >
          Submit
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Button onClick={() => navigate("/register")}>Register </Button>
        </Box>
      </Box>
    </Container>
  );
};
