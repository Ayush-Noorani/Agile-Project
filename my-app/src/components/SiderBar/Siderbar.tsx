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
import { Rings } from "react-loader-spinner";
import { colors } from "../../utils/Common";
interface SideBarProps {
  children: React.ReactNode | React.ReactNode[];
}

export const SideBar = ({ children }: SideBarProps) => {
  const token = localStorage.getItem("token");
  const { user } = useUser();
  const { loading } = useCommon();
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
          height: "100%",
          width: "100%",
        }}
      >
        {id && open ? (
          <Box
            className="sidebar dark"
            sx={{
              backgroundColor: "#313842",
              zIndex: 99,
            }}
          >
            {items.map((value) => (
              <Item
                icon={value.icon}
                label={value.label}
                disabled={value.disabled}
                handleRedirect={handleRedirect}
                path={value.path}
                role={"admin"}
                require={value.require}
              />
            ))}
          </Box>
        ) : (
          <></>
        )}
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "9",
              backgroundColor: "transparent",
            }}
          >
            <Rings
              height="120"
              width="120"
              color="#4fa94d"
              radius="6"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="rings-loading"
            />
          </Box>
        )}
        <Box
          sx={{
            width: open ? "100%" : "100%",
            height: "100%",
            opacity: loading ? 0.5 : 1,
            backgroundColor: colors.tertiary,
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </div>
    </div>
  );
};
