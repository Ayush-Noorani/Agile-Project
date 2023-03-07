import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
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
    setColumns: (state, action) => {
      return produce(state, (draft) => {
        draft.projects[action.payload.projectIndex].columns =
          action.payload.columns;
      });
    },
  },
});

export const { setData, discardUserData, setColumns } = projectSlice.actions;

export default projectSlice.reducer;
