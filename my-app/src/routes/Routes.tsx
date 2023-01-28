import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { Protected } from "../components/Protected";
import { Home } from "../pages/Home/Home";

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
    path: "/home",
    element: <Protected children={<Home />} />,
  },
]);
