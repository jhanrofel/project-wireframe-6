import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Pages/Welcome/Welcome";
import Login from "./Pages/Login/Login";
import LoginSuccessful from "./Pages/Login/LoginSuccessful";
import Register from "./Pages/register/register";
import RegisterSuccessful from "./Pages/register/registerSuccessful";
import ManageUser from "./Pages/User/ManageUser";
import EditUser from "./Pages/User/EditUser";
import ManageDocument from "./Pages/UploadFile/ManageDocument";
import ShareFile from "./Pages/UploadFile/ShareFile";
import GroupChat from "./Pages/Chat/GroupChat";
import PageNotFound from "./Pages/PageNotFound";
import ProtectedLayout from "./Pages/Layout/ProtectedLayout";
import PublicLayout from "./Pages/Layout/PublicLayout";

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
