import React, { useEffect } from "react";
import { WeightLabel } from "./Common";
import "../../css/project.css";
import { IconButton } from "@mui/material";
import { baseURL } from "../../helper/axios";
import { Settings } from "@mui/icons-material";

export const Card = ({
  data,
  settingsClick,
  onClick,
}: {
  data: any;
  settingsClick: Function;
  onClick: Function;
}) => {
  return (
    <div
      key={data.id}
      className="project"
      onClick={(e) => {
        onClick(e);
      }}
    >
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
          onClick={(e) => settingsClick(e)}
        >
          <Settings />
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
          <WeightLabel weight={600}>Members:</WeightLabel> {data.members.length}
        </label>
        <label>
          <WeightLabel weight={600}>Total Tasks:</WeightLabel> {data.totalTasks}
        </label>
      </div>
    </div>
  );
};
