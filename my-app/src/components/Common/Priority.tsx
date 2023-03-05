import { PriorityHigh, Warning, Info } from "@mui/icons-material";
import { Priority } from "../../types/common";

export const TaskPriorityIcon = ({ priority }: { priority: Priority }) => {
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
