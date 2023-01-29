import { useState } from "react";
import "../../css/project.css";
import { Fab } from "@mui/material";
import { Card } from "../../components/Common/Card";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface ProjectProps {}

type ProjectType = {
  id: number;
  name: string;
  description: string;
  members: number;
  img: string;
  totalTasks: number;
};

export const ProjectsList = () => {
  const navigate = useNavigate();
  const [data, setDate] = useState<ProjectType[]>([
    {
      id: 1,
      name: "Project 1",
      description: "This is a project",
      members: 5,
      img: "https://picsum.photos/200",
      totalTasks: 10,
    },
  ]);

  return (
    <div className="project-container">
      {data?.map((item) => (
        <Card
          data={item}
          onClick={(id: string) => navigate(`/project/edit/${id}`)}
        />
      ))}
      <Fab
        color="primary"
        onClick={() => navigate("/project/create/0")}
        sx={{ position: "absolute", bottom: 16, right: 16 }}
      >
        <Add />
      </Fab>
    </div>
  );
};
