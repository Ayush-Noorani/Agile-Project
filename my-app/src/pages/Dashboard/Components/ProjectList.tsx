import { Box, Card, CardMedia, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import "../CSS/styles.css";

const testData = {
  title: "Project 1",
  members: 4,
  additional:
    "Working on making a nuclear bomb for osama my boi. Xoxoxoxox Bing chillings",
};

const testCompnents: any = [];

const style = {};

for (var i = 0; i < 9; i++) {
  testCompnents.push(
    <Grid item xs={6}>
      <Card
        className="growDashboardProject"
        onClick={() => {
          console.log("clicked card");
        }}
        elevation={8}
        sx={{
          display: "flex",
          backgroundColor: "#1A2027",
          color: "white",
          borderRadius: "20px",
          transition: "all .2s ease-in-out",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 100 }}
          image="https://picsum.photos/200"
          alt="Live from space album cover"
        />
        <Box paddingX={3} paddingY={1}>
          <Typography component="div" variant="h6">
            {testData.title}
          </Typography>
          <Typography component="div" variant="body2" gutterBottom>
            {testData.additional.substring(0, 60) + "......"}
          </Typography>
          <Typography component="div" variant="button">
            members: {testData.members}
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
}

const ProjectList = () => {
  return (
    <>
      <Paper
        component={Box}
        elevation={6}
        sx={{
          padding: "25px",
          borderRadius: "20px",
          overflowY: "scroll",
          width: "60%",
          height: "685px",
        }}
      >
        <Box>
          <Typography component="div" variant="h5" gutterBottom>
            Your Projects
          </Typography>

          <Grid container rowSpacing={3} columnSpacing={3}>
            {testCompnents.map((val: any) => val)}
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export { ProjectList };
