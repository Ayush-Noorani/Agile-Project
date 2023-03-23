import React from "react";
import "../../css/sidebar.css";
import { SideBarItemProps } from "../../types/common";
import { Box, Button } from "@mui/material";
export const Item = (props: SideBarItemProps) => {
  return (
    <Box
      className="sidebar-item"
      onClick={() => props.handleRedirect!(props.path, props.require!)}
    >
      {props.icon}

      <h4
        style={{
          whiteSpace: "nowrap",
          marginLeft: "5px",
        }}
      >
        {props.label}
      </h4>
    </Box>
  );
};
