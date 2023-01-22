import { Box } from "@mui/material";
import React from "react";
import "../../css/sidebar.css";

import { Item } from "./Item";
import { items } from "./Routes";
interface SideBarProps {
  children: React.ReactNode | React.ReactNode[];
}

export const SideBar = ({ children }: SideBarProps) => {
  let token = localStorage.getItem("token");

  if (!token) {
    return <>{children}</>;
  }

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        width: "100rem",
        height: "100vh",
      }}
    >
      <Box className="sidebar">
        {items.map((value) => (
          <Item icon={value.icon} label={value.label} path={value.path} />
        ))}
      </Box>

      {children}
    </div>
  );
};
