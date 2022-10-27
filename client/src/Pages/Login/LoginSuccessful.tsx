import React from "react";
import Header from "../../components/header";
import { loggedInData } from "../../utilities/loggedIn";

const LoginSuccessful: React.FC = () => {
  const loggedIn = loggedInData();
  return (
    <div className="container-fluid">
      <div className="main">
        <Header text="Login Successful" />
        <h5>
          <span>Welcome ! </span>
          <span>{loggedIn.email}</span>
        </h5>
      </div>
    </div>
  );
};

export default LoginSuccessful;
