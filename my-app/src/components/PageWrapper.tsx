import React, { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import "../css/login.css";
import { ReactComponent as ScrumBoard } from "../assets/undraw_scrum_board_re_wk7v.svg";
import { ReactComponent as ProjectWork } from "../assets/undraw_organizing_projects_re_9p1k.svg";

import { ReactComponent as SecureLogin } from "../assets/undraw_secure_login_pdn4.svg";

import { ReactComponent as GrowthCurve } from "../assets/undraw_growth_curve_re_t5s7.svg";

import { ReactComponent as SecureFiles } from "../assets/undraw_secure_files_re_6vdh.svg";

export const PageWrapper = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => (
  <Stack
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
    className="background-container"
  >
    <Box className="logo">
      <Typography
        className="logo-text"
        sx={{
          fontWeight: "bold",
        }}
      >
        SprintBoard
      </Typography>
    </Box>
    <div className="person1">
      <ProjectWork className="sidebanner" />
    </div>
    <div className="person2">
      <ScrumBoard className="sidebanner" />
    </div>
    <div className="background"></div>
    <div className="people">
      <SecureLogin className="person person3" />
      <GrowthCurve className="person person4" />
      <SecureFiles className="person person5" />
    </div>
    <div className="background"></div>
    {children}
  </Stack>
);
