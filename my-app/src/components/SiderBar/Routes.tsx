import React from "react";

import { SideBarItemProps } from "../../types/common";
import { AccountTree, Home, List, ListAlt } from "@mui/icons-material";
export const items: SideBarItemProps[] = [
  {
    label: "Dashboard",
    icon: <Home />,
    role: "user",
    path: "/dashboard",
  },
  {
    label: "User list",
    icon: <ListAlt />,
    role: "admin",
    path: "/user-list",
  },
];
