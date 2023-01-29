import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { Protected } from "../components/Protected";
import { Home } from "../pages/Home/Home";
import { ProjectsList } from "../pages/Projects/ProjectsList";
import { ProjectDetail } from "../pages/Projects/ProjectDetail";

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
    element: <Protected children={<Home />} />,
  },
  {
    path: "/projects",
    element: <Protected children={<ProjectsList />} />,
  },

  {
    path: "/project/:type/:id",
    element: <Protected children={<ProjectDetail />} />,
  },
]);
