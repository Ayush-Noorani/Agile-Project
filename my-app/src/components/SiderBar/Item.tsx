import React from "react";
import "../../css/sidebar.css";
import { SideBarItemProps } from "../../types/common";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
export const Item = (props: SideBarItemProps) => {
  const navigate = useNavigate();
  return (
    <Button className="sidebar-item" onClick={() => navigate(props.path)}>
      <h4> {props.label}</h4>
      {props.icon}
    </Button>
  );
};
