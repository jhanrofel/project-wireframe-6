import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../Components/Header";
import Button from "../../Components/Button";
import InputGroup from "../../Components/InputGroup";

import { CookiesCreate } from "../../utilities/cookies";
// import { LoggedInCreate } from "../../Utilitites/LoggedIn";

// import { SocketConnect } from "../../Utilitites/Socket";

import { useAppDispatch } from "../../utilities/hooks";
import { loginUser } from "../../utilities/slice/userSlice";

const Login: React.FC = () => {
  // const socket = SocketConnect();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    let name = (event.target as HTMLInputElement).name;
    let value = (event.target as HTMLInputElement).value;

    switch (name) {
      case "email":
        setFormValues((state) => ({ ...state, email: value }));
        setFormErrors((state) => ({ ...state, email: "", form: "" }));
        break;
      case "password":
        setFormValues((state) => ({ ...state, password: value }));
        setFormErrors((state) => ({ ...state, password: "", form: "" }));
        break;
      default:
        break;
    }
  };

  const onLoginSubmitHandler = async () => {

    if (formValues.email === "")
      setFormErrors((state) => ({
        ...state,
        email: "Email is required.",
      }));
    if (formValues.password === "")
      setFormErrors((state) => ({
        ...state,
        password: "Password is required.",
      }));

      interface postValue {
        email: string;
        password: string;
      }
    
      const postValue: postValue = {
        email: formValues.email,
        password: formValues.password,
      };

    if (formValues.email !== "" && formValues.password !== "") {
      await dispatch(loginUser(postValue)).then((res) => {
        if (res.type === 'users/loginUser/fulfilled') {
          CookiesCreate(res.payload);
          navigate("/login-success");
        } else {
          alert(res.payload);
        }
      });
    }
  };
  return (
    <div>
      <div className="main">
        <Header text="Login" />
        <InputGroup
          type="text"
          label="Email"
          name="email"
          placeholder="anne.hunter@mail.com"
          value={formValues.email}
          error={formErrors.email}
          onChangeHandler={onChangeHandler}
        />
        <InputGroup
          type="password"
          label="Password"
          name="password"
          placeholder="******"
          value={formValues.password}
          error={formErrors.password}
          onChangeHandler={onChangeHandler}
        />
        <Button
          name="login"
          text="Login"
          variant="light"
          className={"btn-cyan"}
          onClick={onLoginSubmitHandler}
        />
      </div>
    </div>
  );
};

export default Login;
