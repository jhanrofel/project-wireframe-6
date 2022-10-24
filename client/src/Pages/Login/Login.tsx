import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../Components/Header";
import Button from "../../Components/Button";
import InputGroup from "../../Components/InputGroup";

// import { ApiLoginUser } from "../../Utilitites/Api";
// import { CookiesCreate } from "../../Utilitites/Cookies";
// import { LoggedInCreate } from "../../Utilitites/LoggedIn";

// import { SocketConnect } from "../../Utilitites/Socket";

const Login: React.FC = () => {
  // const socket = SocketConnect();

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

    if (formValues.email !== "" && formValues.password !== "") {
      navigate("/login-success");
      // await ApiLoginUser(formValues).then((res) => {
      //   if (res.status === "ok") {
      //     CookiesCreate(res.token);

      //     LoggedInCreate(res.user);

      //     socket.emit("send_message", {
      //       message: {
      //         userId: { fullname: res.user.fullname },
      //         message: "Logged in...",
      //         dateSend: "***",
      //       },
      //     });

      //     navigate("/login-success");
      //   } else {
      //     alert(res.message);
      //     return;
      //   }
      // });
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
