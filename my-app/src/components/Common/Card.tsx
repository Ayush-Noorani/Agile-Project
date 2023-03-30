import React from "react";
import { WeightLabel } from "./Common";
import "../../css/project.css";

export const Card = ({ data, onClick }: { data: any; onClick: Function }) => {
  return (
    <div key={data.id} className="project" onClick={() => onClick()}>
      <img
        src={
          data?.img.length > 0
            ? `data:image/png;base64,${data.img}`
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
