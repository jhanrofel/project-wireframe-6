import React from 'react';

import Header from "../../Components/Header";
import Subheader from "../../Components/Subheader";
import Button from "../../Components/Button";

const Welcome: React.FC = () => {
  return (
    <div>
      <div className="main">
        <Header text="Welcome to Users Module" />
        <Subheader text="Existing Users" />
        <Button name="login" text="Login" variant="light" link="./login" />
        <Subheader text="New Users" />
        <Button
          name="register"
          text="Register"
          variant="light"
          link="./register"
        />
        {/* {state && state.logout && <Logout />} */}
      </div>
    </div>
  )
}

export default Welcome;