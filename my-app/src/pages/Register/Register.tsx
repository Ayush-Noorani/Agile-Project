import React, { useMemo, useState } from "react";
import { FormType } from "../../types/common";
import { onChange } from "../../utils/Common";
import dayjs, { Dayjs } from "dayjs";
import { Alert, Box, Button, Container, Stack, TextField } from "@mui/material";
import { useRegister } from "../../hooks/useRegister";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import "../../css/login.css";
import { PageWrapper } from "../../components/PageWrapper";
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
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|}{\[\]\\:;'<>,.?/\-])(?!.*\s).{8,32}$/;

  const checkPassword = useMemo(() => {
    if (!passwordRegex.test(value.password) && value.password.length > 0) {
      return "Password must be 8 charcaters long  containing special character,one uppercase and lowercase letter and a number";
    } else {
      return "";
    }
  }, [value.password]);
  return (
    <PageWrapper>
      <Stack
        className="formbg"
        sx={{
          height: "75%",
          width: "50%",
        }}
        marginBottom="70px"
        spacing={1}
      >
        <h4 style={{ alignSelf: "center" }}>Register</h4>

        <Stack
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
          spacing={2}
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
          {checkPassword ? (
            <Alert severity="error">{checkPassword}</Alert>
          ) : (
            <></>
          )}

          <Button
            disabled={
              loading || checkPassword.length > 0 || value.password.length == 0
            }
            onClick={() => {
              onSubmit(value, setLoading, setError);
            }}
            style={{
              backgroundColor: "#30475E",
            }}
            variant="contained"
          >
            Register
          </Button>
        </Stack>
      </Stack>
    </PageWrapper>
  );
};
