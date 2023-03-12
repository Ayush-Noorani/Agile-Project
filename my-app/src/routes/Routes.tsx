import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { UserTable } from "../pages/UserList/UserTable";
import { Protected } from "../components/Protected";
import { ProjectsList } from "../pages/Projects/ProjectsList";
import { ProjectDetail } from "../pages/Projects/ProjectDetail";
import { TaskList } from "../pages/Task/TaskList";
import { Profile } from "../pages/Profile/Profile";

import { TaskForm } from "../pages/Task/components/TaskForm";
import { AdminProtected } from "../components/AdminProtected";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Protected children={<ProjectsList />} />,
  },
  {
    path: "/user/update-profile",
    element: <Protected children={<Profile />} />,
  },
  {
    path: "/projects",
    element: <Protected children={<ProjectsList />} />,
  },
  {
    path: "/tasks/:id",
    element: <Protected children={<TaskList />} />,
  },
  {
    path: "/prokect/create",
    element: <Protected children={<ProjectDetail />} />,
  },
  {
    path: "/project/:id",
    element: <Protected children={<ProjectDetail />} />,
  },

  {
    path: "/form",
    element: <TaskForm />,
  },
  {
    path: "/user-list",
    element: <AdminProtected children={<UserTable />} />,
  },
]);
