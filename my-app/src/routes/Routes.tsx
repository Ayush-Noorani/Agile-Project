import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { UserTable } from "../pages/UserList/UserTable";
import { Protected } from "../components/Protected";
import { ProjectsList } from "../pages/Projects/ProjectsList";
import { ProjectDetail } from "../pages/Projects/ProjectDetail";
import { Task } from "../pages/Task/Task";

import { rows } from "../pages/UserList/TestData";

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
    path: "/projects",
    element: <Protected children={<ProjectsList />} />,
  },
  {
    path: "/tasks/:projectId",
    element: <Protected children={<Task />} />,
  },
  {
    path: "/project/:id",
    element: <Protected children={<ProjectDetail />} />,
  },
  {
    path: "/employee-list",
    element: <UserTable data={rows} />,
  },
]);
