import React from 'react';
import {useNavigate} from "react-router-dom";
import Header from "../../components/header";
import Subheader from "../../components/subheader";
import Button from "../../components/button";

const RegisterSuccessful: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="main">
        <Header text="Registration Successful" />
        <Subheader text="Thank you for your registration" />
        <Button
          name="link"
          variant="link"
          text="Click to return to home page"
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  )
}

export default RegisterSuccessful;