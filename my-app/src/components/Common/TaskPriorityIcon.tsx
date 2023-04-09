import { PriorityHigh, Warning, Info } from "@mui/icons-material";
import { Box } from "@mui/material";
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "50%",
      }}
    >
      {getTag()}
      {!hideText && priority}
    </Box>
  );
};
