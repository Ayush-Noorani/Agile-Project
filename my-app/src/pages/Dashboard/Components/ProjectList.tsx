import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import "../CSS/styles.css";
import { useDashboard } from "../hooks/useDashboard";
import { ProjectCard } from "./ProjectCard";
import { colors } from "../../../utils/Common";

const testData = {
  title: "Project 1",
  members: 4,
  additional:
    "Working on making a nuclear bomb for osama my boi. Xoxoxoxox Bing chillings",
};

const testCompnents: any = [];

const style = {};

for (let i = 0; i < 9; i++) {
  testCompnents.push();
}

const ProjectList = () => {
  const { projects, dashboard } = useDashboard();

  return (
    <Paper
      component={Box}
      elevation={6}
      sx={{
        padding: "25px",
        borderRadius: "20px",
        height: "70vh",
        overflow: "auto",
        backgroundColor: colors.primary,
        width: "70%",
      }}
    >
      <Box>
        <Typography component="div" variant="h5" gutterBottom>
          Your Projects
        </Typography>

        <Grid container rowSpacing={3} columnSpacing={3}>
          {dashboard.map((val, index) => (
            <ProjectCard key={index.toString()} data={val} />
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export { ProjectList };
