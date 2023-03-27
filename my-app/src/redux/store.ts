import { configureStore } from "@reduxjs/toolkit";
import project from "./reducers/project";
import user from "./reducers/user";
import notification from "./reducers/notification";
import filters from "./reducers/filters";
import tasks from "./reducers/tasks";

export const store = configureStore({
  reducer: {
    user,
    project,
    notification,
    filters,
    tasks,
  },
});
export type RootState = ReturnType<typeof store.getState>;
