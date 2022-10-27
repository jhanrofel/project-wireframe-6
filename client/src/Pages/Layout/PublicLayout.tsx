import { Navigate, Outlet } from "react-router-dom";
import { isLogged } from "../../utilities/loggedIn";

const PublicLayout = () => {
  return isLogged() ? <Navigate to="/users-list" replace /> : <Outlet />;
};

export default PublicLayout;
