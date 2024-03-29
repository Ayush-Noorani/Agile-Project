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
import { BackLog } from "../pages/BackLog/BackLog";
import { PlanList } from "../pages/Plan/PlanList";
import { RetrospectionList } from "../pages/Retrospection/RetrospectionList";
import { DashboardView } from "../pages/Dashboard/DashboardView";
import PieChart from "../pages/PieChart/PieChart";
import Members from "../pages/Members/Members";

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
    path: "/project/retrospective-tasks/:id/:planId?",
    element: <Protected children={<TaskList />} />,
  },
  {
    path: "/project/tasks/:id/:planId?",
    element: <Protected children={<TaskList />} />,
  },
  {
    path: "/project/create",
    element: <Protected children={<ProjectDetail />} />,
  },
  {
    path: "/project/settings/:id",
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
  {
    path: "/project/backlog/:id",
    element: <Protected children={<BackLog />} />,
  },
  {
    path: "/my-dashboard",
    element: <Protected children={<DashboardView />} />,
  },
  {
    path: "/project/plan/:id",
    element: <Protected children={<PlanList />} />,
  },
  {
    path: "/project/retrospection/:id",
    element: <Protected children={<RetrospectionList />} />,
  },
  {
    path: "/project/pie-chart/:id",
    element: <Protected children={<PieChart />} />,
  },
  {
    path: "/project/members/:id",
    element: <Protected children={<Members />} />,
  },
]);
