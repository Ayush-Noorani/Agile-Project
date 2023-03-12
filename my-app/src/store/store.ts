import { configureStore } from "@reduxjs/toolkit";
import project from "./reducers/project";
import user from "./reducers/user";
import notification from "./reducers/notification";
export const store = configureStore({
  reducer: {
    user,
    project,
    notification,
  },
});
export type RootState = ReturnType<typeof store.getState>;
