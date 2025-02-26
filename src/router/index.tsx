import { createBrowserRouter } from "react-router";
import AdminLayout from "../components/Layouts/AdminLayout";
import AgentLayout from "../components/Layouts/AgentLayout";
import NotFound from "../pages/NotFound";
import UserLayout from "../components/Layouts/UserLayout";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import ProtectedRoute from "../components/Layouts/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/admin",
    element: (
        <ProtectedRoute role="Admin">
          <AdminLayout />
        </ProtectedRoute>
      ),
  },
  {
    path: "/agent",
    element: <ProtectedRoute role="Agent">
    <AgentLayout />
  </ProtectedRoute>
  },
  {
    path: "/user",
    element: <ProtectedRoute role="User">
    <UserLayout />
  </ProtectedRoute>
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
