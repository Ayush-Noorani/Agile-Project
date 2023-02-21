import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
type initialStateType = {
  isLoggedIn: boolean;
  userName: string;
  email: string;
};

const initialState: initialStateType = {
  isLoggedIn: false,
  userName: "",
  email: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state = produce(state, (draft) => {
        draft.userName = action.payload.username;
        draft.email = action.payload.email;
        draft.isLoggedIn = true;
      });
      return state;
    },
    discardUserData: (state) => {
      state.isLoggedIn = false;
      state.userName = "";
      state.email = "";
    },
  },
});

export const { discardUserData, setIsLoggedIn, setUser } = userSlice.actions;

export default userSlice.reducer;
