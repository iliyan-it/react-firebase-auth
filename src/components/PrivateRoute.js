import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();

  return !user ? <Navigate to="/auth/login" /> : <Outlet />;
}
