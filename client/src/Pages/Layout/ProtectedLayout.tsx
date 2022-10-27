import { Navigate, Outlet } from "react-router-dom";
import { isLogged } from "../../utilities/loggedIn";
import NavBar from "./navigationBar";

const ProtectedLayout: React.FC = () => {
  return isLogged() ? (
    <>
      <NavBar /> <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedLayout;
