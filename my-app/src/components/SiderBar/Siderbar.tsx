import { Box } from "@mui/material";
import React from "react";
import "../../css/sidebar.css";

import { Item } from "./Item";
import { items } from "./Routes";
import { NavBar } from "../NavBar/NavBar";
interface SideBarProps {
  children: React.ReactNode | React.ReactNode[];
}

export const SideBar = ({ children }: SideBarProps) => {
  let token = localStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  if (!token) {
    return <>{children}</>;
  }

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <NavBar show={open} setShow={setOpen} />

      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
          marginTop: "0.5%",
          height: "100%",
          width: "100%",
        }}
      >
        {open ? (
          <Box className="sidebar">
            {items.map((value) => (
              <Item icon={value.icon} label={value.label} path={value.path} />
            ))}
          </Box>
        ) : (
          <></>
        )}

        {children}
      </div>
    </div>
  );
};
