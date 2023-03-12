import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { Role } from "../../types/common";
type initialStateType = {
  isLoggedIn: boolean;
  userName: string;
  email: string;
  roles: Role[];
  id: string | undefined;
};

const initialState: initialStateType = {
  isLoggedIn: false,
  userName: "",
  email: "",
  roles: [],
  id: undefined,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      console.log(action);
      state = produce(state, (draft) => {
        draft.userName = action.payload.username;
        draft.email = action.payload.email;
        draft.isLoggedIn = true;
        draft.roles = action.payload.roles;
        draft.id = action.payload.id;
      });
      return state;
    },
    discardUserData: (state) => {
      state.isLoggedIn = false;
      state.userName = "";
      state.email = "";
      state.roles = [];
    },
  },
});

export const { discardUserData, setIsLoggedIn, setUser } = userSlice.actions;

export default userSlice.reducer;
