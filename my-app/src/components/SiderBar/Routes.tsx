import React from "react";

import { SideBarItemProps } from "../../types/common";
import { AccountTree, Home, List } from "@mui/icons-material";
export const items: SideBarItemProps[] = [
  {
    label: "Home",
    icon: <Home />,
    path: "/home",
  },
  {
    label: "Projects",
    icon: <AccountTree />,
    path: "/projects",
  },
  {
    label: "Tasks",
    icon: <List />,
    path: "/tasks",
  },
];
