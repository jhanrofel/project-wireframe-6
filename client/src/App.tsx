import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/welcome/welcome";
import Login from "./pages/login/login";
import LoginSuccessful from "./pages/login/loginSuccessful";
import Register from "./pages/register/register";
import RegisterSuccessful from "./pages/register/registerSuccessful";
import ManageUser from "./pages/user/manageUser";
import EditUser from "./pages/user/editUser";
import ManageDocument from "./pages/uploadFile/manageDocument";
import ShareFile from "./pages/uploadFile/shareFile";
import GroupChat from "./pages/chat/groupChat";
import PageNotFound from "./pages/pageNotFound";
import ProtectedLayout from "./pages/layout/protectedLayout";
import PublicLayout from "./pages/layout/publicLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/register-success"
            element={<RegisterSuccessful />}
          ></Route>
        </Route>
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="/login-success" element={<LoginSuccessful />}></Route>
          <Route path="/users-list" element={<ManageUser />}></Route>
          <Route path="/edit-user" element={<EditUser />}></Route>
          <Route path="/doc-list" element={<ManageDocument />}></Route>
          <Route path="/share" element={<ShareFile />}></Route>
          <Route path="/group-chat" element={<GroupChat />}></Route>
          <Route path="/*" element={<PageNotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
