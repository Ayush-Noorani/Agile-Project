import {
  Box,
  Accordion,
  AccordionSummary,
  InputLabel,
  Typography,
  MenuItem,
  Stack,
} from "@mui/material";
import { Fragment, useState } from "react";
import { TableComponent } from "./TableComponent";
import { Tasks } from "../../../types/common";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { colors, formatDateTime } from "../../../utils/Common";
import { Check } from "@mui/icons-material";
import { useBackLog } from "../hooks/useBackLog";
import { useParams } from "react-router-dom";

interface CustomTableProps {
  value: any;
  setSelectedTask: (task: any) => void;
  handleMoveToPlan: (plan: string) => void;
  tasks: Tasks[];
  menuOptions?: any[];
  filter?: string;
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
            width: "100%",
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
            </InputLabel>
            {value.startDate && value.endDate && (
              <Typography variant="body1">
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
              <Stack direction={"row"} marginRight={"30px"} spacing={1}>
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
        filter={value.id}
        tasks={tasks}
      />
    </Accordion>
  );
};
