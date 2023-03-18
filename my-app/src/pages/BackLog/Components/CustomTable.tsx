import {
  Box,
  Accordion,
  AccordionSummary,
  InputLabel,
  Typography,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { TableComponent } from "../../../components/TableComponent";
import tasks from "../../../store/reducers/tasks";
import { Tasks } from "../../../types/common";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { usePlan } from "../hooks/usePlan";

interface CustomTableProps {
  value: any;
  setSelectedTask: (task: any) => void;
  handleMoveToPlan: (plan: string) => void;
  tasks: Tasks[];
  menuOptions: any[];
  filter: string;
  plans: any[];
}
export const CustomTable = ({
  value,
  setSelectedTask,
  handleMoveToPlan,
  menuOptions,
  filter,
  plans,
  tasks,
}: CustomTableProps) => {
  const startDate = new Date(value.startDate);
  const endDate = new Date(value.endDate);
  const startFormateDate = startDate.toLocaleDateString();
  const endFormartDate = endDate.toLocaleDateString();
  const [expanded, setExpanded] = useState(false);
  const { updatePlanStatus } = usePlan();
  const startTime = startDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = endDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <Box className="box">
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="content"
          id="header"
          sx={{
            alignItems: "center",
          }}
        >
          <Box>
            <InputLabel>{value.planName}</InputLabel>
            <Typography variant="body1">
              {`${startFormateDate}, ${startTime} - ${endFormartDate}, ${endTime}`}
            </Typography>{" "}
          </Box>
          <Button
            variant="contained"
            sx={{
              marginLeft: "auto",
            }}
            color={value.status === "1" ? "error" : "success"}
            startIcon={value.status === "1" ? <StopIcon /> : <PlayArrowIcon />}
            onClick={() =>
              updatePlanStatus(value.id, value.status === "0" ? 2 : 1)
            }
          >
            {value.status === "1" ? "Stop" : "Start"}
          </Button>
        </AccordionSummary>

        <TableComponent
          setSelectedTask={setSelectedTask}
          menuOptions={
            plans.length > 0
              ? [
                  ...plans.filter((item) => item.id !== value.id),
                  {
                    id: "backLog",
                    name: "Back Log",
                  },
                ].map((value: any) => (
                  <MenuItem onClick={() => handleMoveToPlan(value.id)}>
                    {value.name}
                  </MenuItem>
                ))
              : [<MenuItem>No plans found</MenuItem>]
          }
          filter={value.id}
          tasks={tasks}
        />
      </Accordion>
    </Box>
  );
};
