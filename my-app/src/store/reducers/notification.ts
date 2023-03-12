import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { Notification } from "../../types/common";

const initialState: Notification[] = [];

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setData: (state, action) => {
      return produce(state, (draft) => {
        draft = [...draft, action.payload];
      });
    },

    resetData: (state, action) => {
      return produce(state, (draft) => {
        draft = [];
      });
    },
  },
});

export const { setData, resetData } = notificationSlice.actions;
export default notificationSlice.reducer;
