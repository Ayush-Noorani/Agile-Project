import React, { useEffect } from "react";
import { WeightLabel } from "./Common";
import "../../css/project.css";
import { IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { baseURL } from "../../helper/axios";

export const Card = ({ data, onClick }: { data: any; onClick: Function }) => {
  return (
    <div key={data.id} className="project">
      <img
        src={
          data?.img
            ? `${baseURL}/image/project/${data.id}.png`
            : "https://picsum.photos/200"
        }
        alt="img"
        style={{
          alignSelf: "center",
          width: "100%",
          height: "100px",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4>{data.name}</h4>
        <IconButton
          aria-label="more"
          id="long-button"
          onClick={(e) => onClick(e)}
        >
          <MoreVert />
        </IconButton>
      </div>
      <p className="desc">{data.description}</p>
      <div
        style={{
          alignSelf: "flex-end",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <label>
          <WeightLabel weight={600}>Members:</WeightLabel> {data.members}
        </label>
        <label>
          <WeightLabel weight={600}>Total Tasks:</WeightLabel> {data.totalTasks}
        </label>
      </div>
    </div>
  );
};
