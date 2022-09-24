import Signup from "./Auth/Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Auth/Login";
import PrivateRoute from "./PrivateRoute";
import PageNotFound from "./PageNotFound";
import ForgottenPassword from "./Auth/ForgottenPassword";
import UpdateProfile from "./Auth/UpdateProfile";
import AuthRoute from "./AuthRoute";

export default function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<AuthRoute />}>
                <Route path="/auth/signup" element={<Signup />} />
                <Route path="/auth/login" element={<Login />} />
                <Route
                  path="/auth/forgotten-password"
                  element={<ForgottenPassword />}
                />
              </Route>
              <Route path="/" element={<PrivateRoute />}>
                <Route path="" element={<Dashboard />} />
                <Route path="/update-profile" element={<UpdateProfile />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </Container>
  );
}
