import React, { useState } from "react";
import { FormType } from "../../types/common";
import { onChange } from "../../utils/Common";
import dayjs, { Dayjs } from "dayjs";
import { Alert, Box, Button, Container, TextField } from "@mui/material";
import { useRegister } from "../../hooks/useRegister";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import "../../css/common.css";
const form: FormType[] = [
  {
    label: "Email",
    type: "email",
    name: "email",
  },
  {
    label: "Name",
    type: "text",
    name: "name",
  },
  {
    label: "Username",
    type: "text",
    name: "username",
  },

  {
    label: "Password",
    type: "password",
    name: "password",
  },
  {
    label: "Confirm Password",
    type: "confirmPassword",
    name: "password",
  },
];

type Form = {
  username: string;
  email: string;
  name: string;
  dob: Dayjs | null;
  password: string;
  confirmPassword: string;
};
export const Register = () => {
  const [value, setValue] = useState<Form>({
    email: "",
    password: "",
    username: "",
    name: "",
    dob: dayjs("2014-08-18T21:11:54"),
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { onSubmit } = useRegister();
  const [error, setError] = useState<any>(null);

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
          height: "60%",
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <h4 style={{ alignSelf: "center" }}>Register</h4>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "90%",
          }}
        >
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
          <DesktopDatePicker
            label="Dob"
            inputFormat="MM/DD/YYYY"
            value={value.dob}
            onChange={(e) => {
              onChange(e, "dob", setValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
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
        </form>
      </Box>
    </Container>
  );
};
