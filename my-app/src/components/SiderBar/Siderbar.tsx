import { Box } from "@mui/material";
import React, { useEffect } from "react";
import "../../css/sidebar.css";

import { Item } from "./Item";
import { items } from "./Routes";
import { NavBar } from "../NavBar/NavBar";
import { useUser } from "../../hooks/useUser";
import { useCommon } from "../../hooks/useCommon";
interface SideBarProps {
  children: React.ReactNode | React.ReactNode[];
}

export const SideBar = ({ children }: SideBarProps) => {
  let token = localStorage.getItem("token");
  const { user } = useUser();
  const { navigate } = useCommon();
  const [open, setOpen] = React.useState(false);
  const handleRedirect = (path: string) => {
    setOpen(false);
    navigate(path);
  };
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
            {items.map((value) =>
              user.roles.includes(value.role) ||
              user.roles.includes("admin") ? (
                <Item
                  icon={value.icon}
                  label={value.label}
                  handleRedirect={handleRedirect}
                  path={value.path}
                  role={"admin"}
                />
              ) : (
                <></>
              )
            )}
          </Box>
        ) : (
          <></>
        )}

        {children}
      </div>
    </div>
  );
};
function fetchUserInfo() {
  throw new Error("Function not implemented.");
}
