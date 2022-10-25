import { Navigate, Outlet } from "react-router-dom";
import { IsLogged } from "../../utilities/loggedIn";
import NavBar from "./navigationBar";

const ProtectedLayout: React.FC = () => {
  return IsLogged() ? (
    <>
      <NavBar /> <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedLayout;
