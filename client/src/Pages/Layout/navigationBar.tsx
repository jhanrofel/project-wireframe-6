import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../utilities/hooks";
import { CookiesRemove } from "../../utilities/cookies";
import { LoggedInRemove, LoggedIn } from "../../utilities/loggedIn";
// import { SocketConnect } from "../../Utilitites/Socket";
import { clearUser } from "../../utilities/slice/userSlice";
import { clearChat } from "../../utilities/slice/chatsSlice";
// import { clearUpload } from "../../Utilitites/Slice/UploadSlice";
// import { clearShare } from "../../Utilitites/Slice/ShareSlice";

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const loggedIn = LoggedIn();
  // const socket = SocketConnect();
  const pathname = useLocation().pathname;

  const onLogout = async () => {
    dispatch(clearUser());
    dispatch(clearChat());
    //   dispatch(clearUpload());
    //   dispatch(clearShare());
    LoggedInRemove();
    CookiesRemove();
    //   socket.emit("send_message", {
    //     message: {
    //       userId: { fullname: loggedIn.fullname },
    //       message: "Logged out...",
    //       dateSend: "***",
    //     },
    //   });
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
