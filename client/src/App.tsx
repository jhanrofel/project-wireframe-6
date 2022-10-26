import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Pages/welcome/welcome";
import Login from "./Pages/login/login";
import LoginSuccessful from "./Pages/login/loginSuccessful";
import Register from "./Pages/register/register";
import RegisterSuccessful from "./Pages/register/registerSuccessful";
import ManageUser from "./Pages/user/manageUser";
import EditUser from "./Pages/user/editUser";
import ManageDocument from "./Pages/uploadFile/manageDocument";
import ShareFile from "./Pages/uploadFile/shareFile";
import GroupChat from "./Pages/chat/groupChat";
import PageNotFound from "./Pages/pageNotFound";
import ProtectedLayout from "./Pages/layout/protectedLayout";
import PublicLayout from "./Pages/layout/publicLayout";

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
