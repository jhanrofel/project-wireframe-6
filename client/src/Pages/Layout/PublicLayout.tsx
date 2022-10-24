import { Outlet } from "react-router-dom";
// import { IsLogged } from "../../Utilitites/LoggedIn";

const PublicLayout = () => {
  return (
    <Outlet />
  )
//   return IsLogged() ? <Navigate to="/users-list" replace /> : <Outlet />;
}

export default PublicLayout