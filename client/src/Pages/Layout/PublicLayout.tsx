import { Navigate, Outlet } from "react-router-dom";
import { IsLogged } from "../../utilities/loggedIn";

const PublicLayout = () => {
  return IsLogged() ? <Navigate to="/users-list" replace /> : <Outlet />;
};

export default PublicLayout;
