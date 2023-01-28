import React from "react";
import { DragAndDrop } from "../../components/DragAndDrop";
import data from "../../res/initial-data";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
interface HomeProps {}

export const Home = ({}: HomeProps) => {
  return (
    <>
      <DragAndDrop data={data} />
      <Fab
        size="small"
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <AddIcon />
      </Fab>
    </>
  );
};
