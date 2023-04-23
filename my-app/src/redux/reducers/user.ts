import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { Role } from "../../types/common";
type initialStateType = {
  name: string;
  isLoggedIn: boolean;
  userName: string;
  email: string;
  roles: Role[];
  id: string | undefined;
  color?: string;
  img: string;
  isLoading: boolean;
};

const initialState: initialStateType = {
  isLoggedIn: false,
  userName: "",
  email: "",
  roles: [],
  id: undefined,
  img: "",
  isLoading: false,
  name: "user",
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
        draft.roles = action.payload.roles;
        draft.img = action.payload.img;
        draft.id = action.payload.id;
        draft.color = action.payload?.color;
        draft.name = action.payload?.name;
      });
      return state;
    },
    discardUserData: (state) => {
      state.isLoggedIn = false;
      state.userName = "";
      state.email = "";
      state.roles = [];
    },
    setLoading: (state, action) => {
      return produce(state, (draft) => {
        draft.isLoading = action.payload;
      });
    },
  },
});

export const { discardUserData, setIsLoggedIn, setUser, setLoading } =
  userSlice.actions;

export default userSlice.reducer;
