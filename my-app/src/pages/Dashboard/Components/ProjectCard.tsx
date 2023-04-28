import React from "react";
import { Grid, Card, CardMedia, Box, Typography } from "@mui/material";
import { useProjectContext } from "../../../context/ProjectContext";
import { useCommon } from "../../../hooks/useCommon";
import { DashBoard, ProjectData } from "../../../types/common";

export const ProjectCard = ({ data }: { data: DashBoard | ProjectData }) => {
  const { setValue } = useProjectContext();
  const { navigate } = useCommon();
  return (
    <Grid item xs={5} mr={2} mb={3}>
      <Card
        className="growDashboardProject"
        onClick={(e: any) => {
          navigate("/project/tasks/" + data.id);
        }}
        elevation={8}
        sx={{
          height: "170px",
          display: "flex",
          backgroundColor: "#1A2027",
          color: "white",
          borderRadius: "20px",
          transition: "all .2s ease-in-out",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "30%" }}
          src={"https://picsum.photos/200"}
          alt="Project img"
        />
        <Box paddingX={3} paddingY={1}>
          <Typography component="div" variant="h6">
            {data.name}
          </Typography>

          <Typography component="div" variant="button">
            members: {data?.members_count?.toString()}
          </Typography>
          <Typography component="div" variant="body2" gutterBottom>
            Remaining: {data?.status?.remaining_tasks}
          </Typography>
          <Typography component="div" variant="body2" gutterBottom>
            Completed: {data?.status?.completed_tasks}
          </Typography>
          <Typography component="div" variant="body2" gutterBottom>
            Total:{" "}
            {data!.status!.completed_tasks! + data!.status!.remaining_tasks!}
          </Typography>
          <Typography component="div" variant="caption">
            Timeline: {data?.startDate?.toString().split("T")[0]}-
            {data.endDate.toString().split("T")[0]}
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
};
