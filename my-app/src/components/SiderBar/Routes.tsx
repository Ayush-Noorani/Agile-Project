import React from "react";

import { SideBarItemProps } from "../../types/common";
import {
  AccountTree,
  Archive,
  Details,
  Home,
  List,
  ListAlt,
  ListAltRounded,
  ListAltSharp,
  PieChart,
  Settings,
  Start,
  Work,
} from "@mui/icons-material";
export const items: SideBarItemProps[] = [
  {
    label: "Active Plan",
    icon: <Start />,
    role: "user",
    path: "/projects",
  },
  {
    label: "RetroSpection",
    icon: <Archive />,
    role: "user",
    path: "/projects",
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
  {
    label: "Reports",
    icon: <PieChart />,
    role: "user",
    path: "/plan",
  },
  {
    label: "Project Detail",
    icon: <Settings />,
    role: "user",
    require: ["projectId"],
    path: "/project/",
  },
];
