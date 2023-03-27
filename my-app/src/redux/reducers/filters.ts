import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
interface FilterState {
  [key: string]: any;
}
const initialState: FilterState = {};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      return produce(state, (draft: FilterState) => {
        const newFilter = { ...action.payload };
        Object.assign(draft, newFilter);
      });
    },

    resetFilter: (state, _action) => {
      state = {};
    },
  },
});

export const { setFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
