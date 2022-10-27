import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import Button from "../../components/button";
import InputGroup from "../../components/inputGroup";
import { cookiesCreate } from "../../utilities/cookies";
import { loggedInCreate } from "../../utilities/loggedIn";
import { useAppDispatch } from "../../utilities/hooks";
import { loginUser } from "../../utilities/slice/userSlice";

interface formValuesState {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<formValuesState>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<formValuesState>({
    email: "",
    password: "",
  });

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
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

  const onLoginSubmitHandler = async (): Promise<void> => {
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

    const postFormValue: postValue = {
      email: formValues.email,
      password: formValues.password,
    };

    if (formValues.email !== "" && formValues.password !== "") {
      await dispatch(loginUser(postFormValue)).then((res) => {
        if (res.type === "users/loginUser/fulfilled") {
          cookiesCreate(res.payload.message);
          loggedInCreate(res.payload.users[0]);
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
