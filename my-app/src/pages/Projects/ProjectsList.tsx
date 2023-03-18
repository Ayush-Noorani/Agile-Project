import { useEffect, useState, Fragment } from "react";
import "../../css/project.css";
import { Fab, MenuItem, Menu } from "@mui/material";
import { Card } from "../../components/Common/Card";
import { Add, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useProject } from "./hooks/useProject";
import { ProjectData } from "../../types/common";

interface ProjectProps {}

export const ProjectsList = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [eTarget, setETarget] = useState<any>(null);

  const { projects, fetchAllProjects } = useProject();
  useEffect(() => {
    fetchAllProjects();
  }, []);
  return (
    <div className="project-container">
      {projects?.map((item: ProjectData, index: any) => (
        <Fragment key={index}>
          <Card
            data={item}
            key={index}
            onClick={(e: any) => {
              let target = eTarget;
              setETarget((prev: any) => (prev === e.target ? null : e.target));
              setShow((_prev) => (e.target !== target ? true : false));
            }}
          />
          <Menu
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
          </Menu>
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
