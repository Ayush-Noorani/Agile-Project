import React from "react";
import "../../css/sidebar.css";
import { SideBarItemProps } from "../../types/common";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
export const Item = (props: SideBarItemProps) => {
  const navigate = useNavigate();
  return (
    <Box className="sidebar-item" onClick={() => navigate(props.path)}>
      <h4> {props.label}</h4>
      {props.icon}
    </Box>
  );
};
