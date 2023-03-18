import React from "react";
import "../../css/sidebar.css";
import { SideBarItemProps } from "../../types/common";
import { Box, Button } from "@mui/material";
export const Item = (props: SideBarItemProps) => {
  return (
    <Box
      className="sidebar-item"
      onClick={() => props.handleRedirect!(props.path)}
    >
      <h4> {props.label}</h4>
      {props.icon}
    </Box>
  );
};
