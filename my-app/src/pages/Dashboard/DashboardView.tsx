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
        width: "100%",
        paddingY: "20px",
      }}
      className="tertiary"
    >
      <Typography variant="h4" mb={3}>
        Welcome, {user.userName}
      </Typography>
      <Grid container spacing={2}>
        <Stack
          direction="column"
          alignItems="center"
          width={"36%"}
          marginRight={"20px"}
          height="100%"
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
      </Grid>
    </Box>
  );
};

export { DashboardView };
