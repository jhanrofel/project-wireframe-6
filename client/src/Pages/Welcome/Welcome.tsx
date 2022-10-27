import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/header";
import Subheader from "../../components/subheader";
import Button from "../../components/button";
import Logout from "./logout";

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <div>
      <div className="main">
        <Header text="Welcome to Users Module" />
        <Subheader text="Existing Users" />
        <Button
          name="login"
          text="Login"
          variant="light"
          onClick={() => navigate("./login")}
        />
        <Subheader text="New Users" />
        <Button
          name="register"
          text="Register"
          variant="light"
          onClick={() => navigate("./register")}
        />
        {state && state.logout && <Logout />}
      </div>
    </div>
  );
};

export default Welcome;
