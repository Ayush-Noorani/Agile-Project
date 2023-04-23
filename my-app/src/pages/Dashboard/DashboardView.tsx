import { Box, Grid, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { ProjectList } from "./Components/ProjectList";
import { TaskList } from "./Components/TaskList";
import { TaskPerfromance } from "./Components/TaskPerformance";
import { useDashboard } from "./hooks/useDashboard";
const DashboardView = () => {
  const { user } = useUser();
  const { getDashboardData, projects, dashboard } = useDashboard();
  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <Box
      sx={{
        paddingX: "20px",
        paddingY: "20px",
        justifyContent: "space-between",
      }}
      className="tertiary"
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h4" mb={3}>
          Welcome, {user.userName}
        </Typography>
        <img
          width="100px"
          src={require("../../assets/code.gif")}
          alt="My GIF"
        />
      </Stack>
      <Box sx={{ display: "flex" }}>
        <Stack
          direction="column"
          alignItems="center"
          marginRight={"20px"}
          width={"30%"}
        >
          <TaskPerfromance
            remaining={dashboard.reduce(
              (acc, curr) => acc + curr.status!.remaining_tasks,
              0
            )}
            complete={dashboard.reduce(
              (acc, curr) => acc + curr.status!.completed_tasks,
              0
            )}
          />
          <TaskList />
        </Stack>
        <ProjectList />
      </Box>
    </Box>
  );
};

export { DashboardView };
