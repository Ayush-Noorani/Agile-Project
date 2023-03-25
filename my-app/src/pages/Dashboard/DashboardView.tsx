import { Box, Grid, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { ProjectList } from "./Components/ProjectList";
import { TaskList } from "./Components/TaskList";
import { TaskPerfromance } from "./Components/TaskPerformance";

const DashboardView = () => {
  return (
    <>
      <Box
        sx={{
          paddingX: "20px",
          width: "100%",
          paddingY: "20px",
        }}
      >
        <Typography variant="h4" mb={3}>
          Welcome, PersonX
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            width={"36%"}
          >
            <TaskPerfromance remaining={5} complete={12} />
            <TaskList />
          </Stack>
          <ProjectList />
        </Box>
      </Box>
    </>
  );
};

export { DashboardView };
