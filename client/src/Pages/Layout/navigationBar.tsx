import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../utilities/hooks";
import { cookiesRemove } from "../../utilities/cookies";
import { LoggedInRemove } from "../../utilities/loggedIn";
import { clearUser } from "../../utilities/slice/userSlice";
import { clearChat } from "../../utilities/slice/chatSlice";
import { clearUpload } from "../../utilities/slice/uploadSlice";
import { clearShareTo } from "../../utilities/slice/shareToSlice";

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const pathname = useLocation().pathname;

  const onLogout = async () => {
    dispatch(clearUser());
    dispatch(clearChat());
    dispatch(clearUpload());
    dispatch(clearShareTo());
    LoggedInRemove();
    cookiesRemove();
  };
  return (
    <>
      <div className="nav-bar">
        <NavLink
          to="/group-chat"
          className={({ isActive }) => (isActive ? "nav-selected" : "nav-link")}
        >
          Group Chat
        </NavLink>
        <NavLink
          to="/users-list"
          className={({ isActive }) =>
            isActive || pathname === "/edit-user" ? "nav-selected" : "nav-link"
          }
        >
          Manage Users
        </NavLink>
        <NavLink
          to="/doc-list"
          className={({ isActive }) =>
            isActive || pathname === "/share" ? "nav-selected" : "nav-link"
          }
        >
          Manage Documents
        </NavLink>
        <NavLink
          to="/"
          className="nav-link"
          state={{ logout: true }}
          onClick={onLogout}
        >
          Logout
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
