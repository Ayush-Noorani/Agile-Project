import { configureStore } from "@reduxjs/toolkit";
import project from "./reducers/project";
import user from "./reducers/user";

export const store = configureStore({
  reducer: {
    user,
    project,
  },
});
export type RootState = ReturnType<typeof store.getState>;
