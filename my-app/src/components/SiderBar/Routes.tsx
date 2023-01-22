import React from "react";

import { SideBarItemProps } from "../../types/common";
import { Home } from "@mui/icons-material";
export const items: SideBarItemProps[] = [
  {
    label: "Home",
    icon: <Home />,
    path: "/home",
  },
];
