import { Box } from "@mui/material";
import React from "react";
import "../../css/sidebar.css";

import { Item } from "./Item";
import { items } from "./Routes";
import { NavBar } from "../NavBar/NavBar";
import { useUser } from "../../hooks/useUser";
import { useCommon } from "../../hooks/useCommon";
import { useProjectContext } from "../../context/ProjectContext";
import { useParams } from "react-router-dom";
interface SideBarProps {
  children: React.ReactNode | React.ReactNode[];
}

export const SideBar = ({ children }: SideBarProps) => {
  const token = localStorage.getItem("token");
  const { user } = useUser();
  const { selected, setValue } = useProjectContext();
  const { navigate } = useCommon();
  const { id } = useParams();

  const [open, setOpen] = React.useState(false);
  const handleRedirect = (path: string, require: string[]) => {
    setOpen(false);
    console.log(id, require);
    // consoleStatement(
    //   "/project" + (require.includes("projectId") ? path + id : path),
    //   "red"
    // );
    navigate("/project" + (require.includes("projectId") ? path + id : path));
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
                  require={value.require}
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
