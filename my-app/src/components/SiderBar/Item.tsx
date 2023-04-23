import React from "react";
import "../../css/sidebar.css";
import { SideBarItemProps } from "../../types/common";
import { Box, Tooltip } from "@mui/material";
import { useToastContext } from "../../context/ToastContext";
export const Item = (props: SideBarItemProps) => {
  const { toast, defaultValue } = useToastContext();
  return (
    <Tooltip title={props.label}>
      <Box
        className="sidebar-item"
        sx={{
          opacity: props.disabled ? 0.5 : 1,
        }}
        onClick={() =>
          !props.disabled
            ? props.handleRedirect!(props.path, props.require!)
            : toast.info("TBD", defaultValue)
        }
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
    </Tooltip>
  );
};
