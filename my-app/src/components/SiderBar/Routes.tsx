import React from "react";

import { SideBarItemProps } from "../../types/common";
import {
  AccountTree,
  Archive,
  List,
  People,
  PieChart,
  Settings,
  Start,
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
    label: "Members",
    icon: <People />,
    role: "user",
    require: ["projectId"],
    path: "/members/",
  },
  {
    label: "Project Detail",
    icon: <Settings />,
    role: "user",
    require: ["projectId"],
    path: "/settings/",
  },
  {
    label: "View Slack",
    icon: <img src={require("../../assets/slack.png")} width="30px" />,
    role: "user",
    disabled: true,
    require: ["projectId"],
    path: "/project/",
  },
  {
    label: "View Teams",
    icon: (
      <img src={require("../../assets/microsoft-teams.png")} width="30px" />
    ),
    role: "user",
    disabled: true,
    require: ["projectId"],
    path: "/project/",
  },
];
