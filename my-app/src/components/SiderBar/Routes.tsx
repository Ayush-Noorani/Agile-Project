import React from "react";

import { SideBarItemProps } from "../../types/common";
import { AccountTree, Home, List } from "@mui/icons-material";
export const items: SideBarItemProps[] = [
  {
    label: "Dashboard",
    icon: <Home />,
    path: "/dashboard",
  },
];
