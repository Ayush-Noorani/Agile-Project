import React from "react";
import { WeightLabel } from "./Common";
import "../../css/project.css";

export const Card = ({ data, onClick }: { data: any; onClick: Function }) => {
  return (
    <div className="project" onClick={() => onClick(data.id)}>
      <img
        src={data?.img ? data.img : "https://picsum.photos/200"}
        alt="img"
        style={{
          alignSelf: "center",
          width: "100%",
          height: "100px",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      />
      <h4>{data.name}</h4>
      <p className="desc">{data.description}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
