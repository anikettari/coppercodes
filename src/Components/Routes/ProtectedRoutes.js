import LoginPage from "../Pages/LoginPage";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const useAuth = () => {
  const cookies = new Cookies();
  console.log(cookies.get("AuthToken"));

  const user = { LoggedIn: true };
  return user && user.LoggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <LoginPage />;
};

export default ProtectedRoutes;
