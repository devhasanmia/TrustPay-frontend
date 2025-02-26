import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { tokenVerify } from "../../utils/tokenVerify";

type TProtectedRoute = {
  children: ReactNode;
  role?: string;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector((state) => state.auth.token);
  const user = token ? tokenVerify(token) : null;
  if (!token || (role && user?.accountType !== role)) {
    if (token && role && user?.accountType !== role) {
      return <Navigate to="/login" replace={true} />;
    }
    return <Navigate to="/login" replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;