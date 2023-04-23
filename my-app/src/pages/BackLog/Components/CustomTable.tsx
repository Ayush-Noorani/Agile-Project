import {
  Box,
  Accordion,
  AccordionSummary,
  InputLabel,
  Typography,
  MenuItem,
  Stack,
  Badge,
  IconButton,
  Paper,
} from "@mui/material";
import { Fragment, useMemo, useState } from "react";
import { TableComponent } from "./TableComponent";
import { Plan, Tasks } from "../../../types/common";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { colors, formatDateTime } from "../../../utils/Common";
import { Check } from "@mui/icons-material";
import { useBackLog } from "../hooks/useBackLog";
import { useParams } from "react-router-dom";

interface CustomTableProps {
  value: Plan;
  setSelectedTask: (task: any) => void;
  handleMoveToPlan: (plan: string) => void;
  tasks: Tasks[];
  menuOptions?: any[];
  filter?: string;
  plans: Plan[];
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
  const { id } = useParams();
  const startDate = value?.startDate && new Date(value.startDate);
  const endDate = value?.endDate && new Date(value.endDate);
  const [expanded, setExpanded] = useState(false);
  const { updatePlanStatus } = useBackLog(id!);
  const [startFormatDate, startTime] = value?.startDate
    ? formatDateTime(startDate)
    : [0, 0];
  const [endFormatDate, endTime] = value?.endDate
    ? formatDateTime(endDate)
    : [0, 0];
  const newTasks = useMemo(
    () =>
      tasks.filter((task) => task.new === true && task.plan === value.id)
        .length,
    [tasks]
  );
  return (
    <Accordion
      className="box tertiary"
      expanded={expanded}
      sx={{
        backgroundColor: colors.tertiary,
      }}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="content"
        id="header"
      >
        <Stack
          sx={{
            display: "flex",
            width: "95%",
          }}
          direction="row"
          justifyContent="space-between"
          paddingLeft="10px"
          paddingRight="15px"
          className=""
        >
          <Box
            sx={{
              width: "20%",
            }}
          >
            <InputLabel
              sx={{
                fontWeight: "bold",
              }}
            >
              {value.planName}
              {newTasks > 0 && (
                <IconButton
                  color="secondary"
                  style={{
                    borderRadius: "50%",
                    fontSize: "medium",
                    backgroundColor: colors.primary,
                  }}
                  aria-label="notifications"
                >
                  {newTasks}
                </IconButton>
              )}
            </InputLabel>
            {value.startDate && value.endDate && (
              <Typography variant="body1" whiteSpace="nowrap">
                {`${startFormatDate}, ${startTime} - ${endFormatDate}, ${endTime}`}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "20%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: colors.tertiary,
            }}
          >
            {value.planName !== "Back Log" && (
              <Stack direction={"row"} spacing={1}>
                <Button
                  startIcon={<Check />}
                  onClick={(e) => {
                    e.stopPropagation();

                    updatePlanStatus(value, 3);
                  }}
                  variant="outlined"
                  style={{
                    whiteSpace: "nowrap",

                    width: "200px",
                  }}
                  disabled={value.status === "3" || value.status !== "1"}
                >
                  {value.status !== "3" ? "Mark as completed" : "Completed"}
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    marginLeft: "auto",
                  }}
                  color={
                    value.status === "1"
                      ? "error"
                      : value.status === "2" || value.status === "0"
                      ? "success"
                      : "secondary"
                  }
                  startIcon={
                    value.status === "1" ? (
                      <StopIcon />
                    ) : value.status === "2" || value.status === "0" ? (
                      <PlayArrowIcon />
                    ) : (
                      <></>
                    )
                  }
                  disabled={value.status === "3"}
                  onClick={(e) => {
                    e.stopPropagation();
                    updatePlanStatus(value, value.status === "1" ? "2" : "1");
                  }}
                >
                  {value.status === "1"
                    ? "Stop"
                    : value.status === "2" || value.status === "0"
                    ? "Start"
                    : "ENDED"}
                </Button>
              </Stack>
            )}
          </Box>
        </Stack>
      </AccordionSummary>
      <Paper
        component={Box}
        className="dark"
        sx={{
          paddingY: "23px",
          paddingX: "10px",
          marginTop: "10px",
          width: "96%",
          backgroundColor: colors.tertiary,
          height: "fit-content",
          overflow: "auto",
        }}
      >
        <TableComponent
          setSelectedTask={setSelectedTask}
          menuOptions={
            plans.length > 0
              ? [
                  ...plans.filter((item) => item.id !== value.id),
                  ...(value.id !== "backLog"
                    ? [
                        {
                          id: "backLog",
                          planName: "Back Log",
                        },
                      ]
                    : []),
                ].map((value: any) => (
                  <MenuItem onClick={() => handleMoveToPlan(value.id)}>
                    {value.planName}
                  </MenuItem>
                ))
              : [<MenuItem>No plans found</MenuItem>]
          }
          filter={value.id!}
          tasks={tasks}
        />
      </Paper>
    </Accordion>
  );
};
