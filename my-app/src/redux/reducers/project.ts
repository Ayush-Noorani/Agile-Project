import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { DashBoard, ProjectData } from "../../types/common";
type initialStateType = {
  projects: ProjectData[];
  dashboard: DashBoard[];
};

const initialState: initialStateType = {
  projects: [],
  dashboard: [],
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
    setColumns: (state, action) => {
      return produce(state, (draft) => {
        draft.projects[action.payload.projectIndex].columns =
          action.payload.columns;
      });
    },
    setDashboard: (state, action) => {
      return produce(state, (draft) => {
        draft.dashboard = action.payload;
      });
    },
  },
});

export const { setData, discardUserData, setColumns, setDashboard } =
  projectSlice.actions;

export default projectSlice.reducer;
