import { useEffect, useState, Fragment } from "react";
import "../../css/project.css";
import { Box, Fab, Switch } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useProject } from "./hooks/useProject";
import { ProjectData } from "../../types/common";
import { useProjectContext } from "../../context/ProjectContext";
import { ProjectCard } from "../Dashboard/Components/ProjectCard";
import { useUser } from "../../hooks/useUser";

export const ProjectsList = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { user } = useUser();
  const [pieChartProjectId, setPieChartProjectId] = useState<
    undefined | string
  >(undefined);
  const [showMyProjects, setShowMyProjects] = useState(false);
  const { projects, fetchAllProjects } = useProject();
  useEffect(() => {
    fetchAllProjects();
  }, []);

  const { setValue } = useProjectContext();

  return (
    <Box>
      <Box
        sx={{
          alignItems: "center",
        }}
      >
        <Switch
          checked={showMyProjects}
          onChange={() => setShowMyProjects(!showMyProjects)}
          inputProps={{ "aria-label": "toggle switch" }}
        />{" "}
        My Projects
      </Box>
      <div className="project-container">
        {(showMyProjects
          ? projects.filter(
              (value) =>
                value.members.findIndex((item) => item.id === user.id) !== -1
            )
          : projects
        )?.map((item: ProjectData, index: any) => (
          <Fragment key={index}>
            <ProjectCard data={item} />
          </Fragment>
        ))}
        <Fab
          color="primary"
          onClick={() => navigate("/project/create")}
          sx={{ position: "absolute", bottom: 16, right: 16 }}
        >
          <Add />
        </Fab>
      </div>
    </Box>
  );
};
