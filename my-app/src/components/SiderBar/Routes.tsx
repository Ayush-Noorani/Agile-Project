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
    require: ["projectId"],

    path: "/tasks/",
  },
  {
    label: "RetroSpection",
    icon: <Archive />,
    role: "user",
    require: ["projectId"],

    path: "/retrospection/",
  },

  {
    label: "Backlog",
    icon: <List />,
    role: "user",
    require: ["projectId"],

    path: "/backlog/",
  },
  {
    label: "Plan",
    icon: <AccountTree />,
    role: "lead",
    require: ["projectId"],

    path: "/plan/",
  },
  {
    label: "Reports",
    icon: <PieChart />,
    role: "user",
    require: ["projectId"],

    path: "/pie-chart/",
  },
  {
    label: "Project Detail",
    icon: <Settings />,
    role: "user",
    require: ["projectId"],
    path: "/settings/",
  },
];
