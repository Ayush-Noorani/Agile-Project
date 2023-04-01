import { useEffect, useState, Fragment } from "react";
import "../../css/project.css";
import { Fab } from "@mui/material";
import { Card } from "../../components/Common/Card";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useProject } from "./hooks/useProject";
import { ProjectData } from "../../types/common";
import { useProjectContext } from "../../context/ProjectContext";
import { ProjectCard } from "../Dashboard/Components/ProjectCard";

export const ProjectsList = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [pieChartProjectId, setPieChartProjectId] = useState<
    undefined | string
  >(undefined);
  const [selectedProjectName, setSelectedProjectName] = useState<string>("");
  const [eTarget, setETarget] = useState<any>(null);

  const { projects, fetchAllProjects } = useProject();
  useEffect(() => {
    fetchAllProjects();
  }, []);

  const { setValue } = useProjectContext();

  return (
    <div className="project-container">
      {projects?.map((item: ProjectData, index: any) => (
        <Fragment key={index}>
          <ProjectCard data={item} />

          {/* <Menu
            id="basic-menu"
            anchorEl={eTarget}
            open={show}
            style={{ bottom: "0px", right: "0px" }}
            onClose={() => {
              setShow(false);
              setETarget(null);
            }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => navigate(`/project/${item.id}`)}>
              View Project Details
            </MenuItem>
            <MenuItem onClick={() => navigate(`/tasks/${item.id}`)}>
              View Tasks
            </MenuItem>
            <MenuItem
              onClick={() => {
                showPieChart(item.id, item.description);
                setShow(false);
                setETarget(null);
              }}
            >
              View Project Status
            </MenuItem>
          </Menu> */}
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
  );
};
