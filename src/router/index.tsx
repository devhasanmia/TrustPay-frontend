import { createBrowserRouter } from "react-router";
import AdminLayout from "../components/Layouts/AdminLayout";
import AgentLayout from "../components/Layouts/AgentLayout";
import NotFound from "../pages/NotFound";
import UserLayout from "../components/Layouts/UserLayout";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import ProtectedRoute from "../components/Layouts/ProtectedRoute";
import AgentRequest from "../components/AgentRequest";
import AgentList from "../components/AgentList";
import SendMoney from "../components/SendMoney";

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
      children: [
        { path: "agents-approval-request", element: <AgentRequest/> },
        {path: "agents-list", element: <AgentList/>}
      ]
  },
  {
    path: "/agent",
    element: <ProtectedRoute role="Agent">
    <AgentLayout />
  </ProtectedRoute>
  },
  {
    path: "/user",
    element: <ProtectedRoute role="User"><UserLayout /></ProtectedRoute>,
  children: [
    { path: "send-money", element: <SendMoney/> },
    // { path: "agent-list", element: <AgentList/>}
  ]
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
