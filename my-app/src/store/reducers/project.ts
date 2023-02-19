import { createSlice } from "@reduxjs/toolkit";
import { ProjectData } from "../../types/common";
type initialStateType = {
  projects: ProjectData[];
};

const initialState: initialStateType = {
  projects: [],
};
const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.projects = action.payload;
    },
    discardUserData: (state) => {
      state.projects = [];
    },
  },
});

export const { setData, discardUserData } = projectSlice.actions;

export default projectSlice.reducer ;
