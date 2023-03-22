import React from "react";

import { SideBarItemProps } from "../../types/common";
import {
  AccountTree,
  Home,
  List,
  ListAlt,
  ListAltRounded,
  ListAltSharp,
  Work,
} from "@mui/icons-material";
export const items: SideBarItemProps[] = [
  {
    label: "Dashboard",
    icon: <Home />,
    role: "user",
    path: "/home",
  },
  {
    label: "Projects",
    icon: <Work />,
    role: "user",
    path: "/projects",
  },
  {
    label: "User list",
    icon: <ListAlt />,
    role: "admin",
    path: "/user-list",
  },
  {
    label: "Backlog",
    icon: <List />,
    role: "user",
    path: "/backlog",
  },
  {
    label: "Plan",
    icon: <AccountTree />,
    role: "lead",
    path: "/plan",
  },
];
