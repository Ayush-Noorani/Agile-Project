import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { colors } from "../utils/Common";
export const SplashScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: colors.secondary,
      }}
    >
      <CircularProgress
        size={80}
        style={{
          color: colors.primary,
        }}
        color="inherit"
      />
      <Typography
        variant="h5"
        style={{
          color: "white",
        }}
        className={`${colors.tertiary}`}
      >
        Loading...
      </Typography>
    </div>
  );
};

export default SplashScreen;
