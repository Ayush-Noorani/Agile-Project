import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { UserTable } from "../pages/UserList/UserTable";
import { Protected } from "../components/Protected";
import { ProjectsList } from "../pages/Projects/ProjectsList";
import { ProjectDetail } from "../pages/Projects/ProjectDetail";
import { Task } from "../pages/Task/Task";
import { Profile } from "../pages/Profile/Profile";

import { rows } from "../pages/UserList/TestData";
import { TaskForm } from "../pages/Task/TaskForm";

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
    path: "/tasks/:projectId",
    element: <Protected children={<Task />} />,
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
    path: "/employee-list",
    element: <UserTable data={rows} />,
  },
  {
    path: "/form",
    element: <TaskForm />,
  },
]);
