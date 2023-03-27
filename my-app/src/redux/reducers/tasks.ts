import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { Tasks } from "../../types/common";

const initialState: Tasks[] = [];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTask: (state, action) => {
      return produce(state, (draft: Tasks[]) => {
        draft = [...draft, ...action.payload];
      });
    },

    resetTask: (state, _action) => {
      state = [];
    },
  },
});

export const { setTask, resetTask } = taskSlice.actions;
export default taskSlice.reducer;
