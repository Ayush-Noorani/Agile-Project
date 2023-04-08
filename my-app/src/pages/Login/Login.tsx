import React, { useState } from "react";
import { FormType } from "../../types/common";
import { onChange } from "../../utils/Common";
import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useLogin } from "../../hooks/useLogin";
import "../../css/common.css";
import "../../css/login.css";
import { ReactComponent as ScrumBoard } from "../../assets/undraw_scrum_board_re_wk7v.svg";
import { ReactComponent as PeopleCollab } from "../../assets/undraw_collaborators_re_hont.svg";

import { ReactComponent as SecureLogin } from "../../assets/undraw_secure_login_pdn4.svg";

import { ReactComponent as GrowthCurve } from "../../assets/undraw_growth_curve_re_t5s7.svg";

import { ReactComponent as SecureFiles } from "../../assets/undraw_secure_files_re_6vdh.svg";

import { useToastContext } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../../components/PageWrapper";

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
    <PageWrapper>
      <Stack className="form-bg form" spacing={2} pb={2}>
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
            type={item.type}
            key={item.name}
          />
        ))}

        {error ? <Alert severity="error">{error}</Alert> : <></>}
        <Button
          disabled={loading}
          onClick={() => {
            onSubmit(value, setLoading, setError);
          }}
          variant="contained"
          style={{
            backgroundColor: "#30475E",
          }}
        >
          Submit
        </Button>
        <Box
          color="inherit"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate("/register")}
          >
            Register{" "}
          </Button>
        </Box>
      </Stack>
    </PageWrapper>
  );
};
