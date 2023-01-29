import styled from "@emotion/styled";
import { TextField } from "@mui/material";

interface WeightLabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  weight?:
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900
    | "bold"
    | "bolder"
    | "lighter"
    | "normal"
    | "initial"
    | "inherit";
}
export const WeightLabel = styled.label<WeightLabelProps>`
  font-weight: ${({ weight }) => weight || "normal"};
  color: #18181a;
  margin-bottom: 5px;
`;

export const FormTextField = styled(TextField)`
  margin-top: 5px;
  margin-bottom: 5px;
`;
