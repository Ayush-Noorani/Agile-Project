import { Card, Typography, Box, Grid, Paper } from "@mui/material";
import Divider from "@mui/material/Divider";
import React from "react";

type TaskPerformanceProps = {
  remaining: number;
  complete: number;
};

const TaskPerfromance = ({ remaining, complete }: TaskPerformanceProps) => {
  return (
    <Paper
      component={Box}
      elevation={6}
      sx={{
        color: "white",
        backgroundColor: "#1A2027",
        borderRadius: "20px",
        paddingY: "25px",
        width: "100%",
      }}
    >
      <Grid container>
        <Grid item xs={12} pb={3}>
          <Typography gutterBottom variant="h5" align="center">
            Task Overview
          </Typography>
        </Grid>
        <Grid container>
          <Grid item xs>
            <Box>
              <Typography variant="h3" align="center">
                {remaining}
              </Typography>
              <Typography
                gutterBottom
                variant="caption"
                component="div"
                align="center"
              >
                Remaining
              </Typography>
            </Box>
          </Grid>
          <Divider
            orientation="vertical"
            flexItem
            variant="middle"
            sx={{ borderColor: "white", opacity: "0.08" }}
          ></Divider>
          <Grid item xs>
            <Typography variant="h3" align="center">
              {complete}
            </Typography>
            <Typography
              gutterBottom
              variant="caption"
              component="div"
              align="center"
            >
              Complete
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export { TaskPerfromance };
