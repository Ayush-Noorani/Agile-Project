import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import React from "react";
import { FormTextField } from "./Common";

interface CustomFormControlProps {
  label: string;
  helperText: string;
  name: string;
  onChange: Function;
  value: string;
  type: string;
}
export const CustomFormControl = (props: CustomFormControlProps) => {
  const { label, helperText, name, onChange } = props;
  return (
    <FormControl margin="normal" style={{ margin: "5px", width: "500px" }}>
      <FormTextField
        id="my-input"
        aria-describedby="my-helper-text"
        label={label}
        style={{ height: "50%" }}
        variant="outlined"
        onChange={(e) => onChange(name, e.target.value)}
      />
      <FormHelperText id="my-helper-text">{helperText}</FormHelperText>
    </FormControl>
  );
};
