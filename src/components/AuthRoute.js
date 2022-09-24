import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AuthRoute({ children }) {
  const { user } = useAuth();

  return user ? <Navigate to="/" /> : <Outlet />;
}
