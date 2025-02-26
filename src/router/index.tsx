import { createBrowserRouter } from "react-router";
import AdminLayout from "../components/Layouts/AdminLayout";
import AgentLayout from "../components/Layouts/AgentLayout";
import NotFound from "../pages/NotFound";
import UserLayout from "../components/Layouts/UserLayout";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/admin",
    element: <AdminLayout />
  },
  {
    path: "/agent",
    element: <AgentLayout />
  },
  {
    path: "/user",
    element: <UserLayout />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/registration",
    element: <Registration />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;
