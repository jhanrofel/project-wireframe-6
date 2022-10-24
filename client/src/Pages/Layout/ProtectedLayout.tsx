import { Outlet } from "react-router-dom";
// import { IsLogged } from "../../Utilitites/LoggedIn";
import NavBar from "./Navbar";

const ProtectedLayout: React.FC = () => {
  return (
    <>
      <NavBar /> <Outlet />
    </>
  );
  // return IsLogged() ? (
  // <>
  //     <NavBar /> <Outlet />
  // </>
  // ) : (
  // <Navigate to="/login" replace />
  // );
};

export default ProtectedLayout;
