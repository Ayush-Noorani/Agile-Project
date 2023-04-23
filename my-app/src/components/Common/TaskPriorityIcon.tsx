import { PriorityHigh, Warning, Info } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { Priority } from "../../types/common";

export const TaskPriorityIcon = ({
  priority,
  hideText,
}: {
  priority: Priority;
  hideText?: boolean;
}) => {
  const getTag = () => {
    if (priority === "critical") {
      return <PriorityHigh style={{ color: "red" }} />;
    } else if (priority === "major") {
      return <Warning style={{ color: "orange" }} />;
    } else if (priority === "moderate") {
      return <Info style={{ color: "yellow" }} />;
    } else if (priority === "minor") {
      return <Info style={{ color: "blue" }} />;
    } else {
      return null;
    }
  };
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {getTag()}
      {!hideText && <h4>{priority.toLocaleUpperCase()}</h4>}
    </Stack>
  );
};
