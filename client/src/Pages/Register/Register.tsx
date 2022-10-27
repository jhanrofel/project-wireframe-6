import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import InputGroup from "../../components/inputGroup";
import Button from "../../components/button";
import { useAppDispatch } from "../../utilities/hooks";
import { postUser } from "../../utilities/slice/userSlice";

interface formValueState {
  fullname: string;
  email: string;
  password: string;
  confirm: string;
}

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<formValueState>({
    fullname: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [formErrors, setFormErrors] = useState<formValueState>({
    fullname: "",
    email: "",
    password: "",
    confirm: "",
  });

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    let name = (event.target as HTMLInputElement).name;
    let value = (event.target as HTMLInputElement).value;

    switch (name) {
      case "fullname":
        setFormValues((state) => ({ ...state, fullname: value }));
        setFormErrors((state) => ({ ...state, fullname: "" }));
        break;
      case "email":
        setFormValues((state) => ({ ...state, email: value }));
        setFormErrors((state) => ({ ...state, email: "" }));
        break;
      case "password":
        setFormValues((state) => ({ ...state, password: value }));
        setFormErrors((state) => ({ ...state, password: "" }));
        break;
      case "confirm":
        setFormValues((state) => ({ ...state, confirm: value }));
        setFormErrors((state) => ({ ...state, confirm: "" }));
        break;
      default:
        break;
    }
  };

  const onRegisterSubmitHandler = async (): Promise<void> => {
    if (formValues.fullname === "")
      setFormErrors((state) => ({
        ...state,
        fullname: "Fullname is required.",
      }));
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
    if (formValues.confirm === "")
      setFormErrors((state) => ({
        ...state,
        confirm: "Confirm password is required.",
      }));

    if (
      formValues.fullname !== "" &&
      formValues.email !== "" &&
      formValues.password !== "" &&
      formValues.confirm !== ""
    ) {
      /* email validation */
      const apos = formValues.email.indexOf("@");
      const dotpos = formValues.email.lastIndexOf(".");
      if (apos < 1 || dotpos - apos < 2) {
        alert("Invalid email.");
        return;
      }
      if (formValues.password !== formValues.confirm) {
        alert("Confirm password does not match.");
        return;
      } else {
        interface postValue {
          fullname: string;
          email: string;
          password: string;
        }

        const postUserValue: postValue = {
          fullname: formValues.fullname,
          email: formValues.email,
          password: formValues.password,
        };

        await dispatch(postUser(postUserValue)).then((res) => {
          if (res.type === "users/postUser/fulfilled") {
            navigate("/register-success");
          } else {
            alert(res.payload);
          }
        });
      }
    }
  };

  return (
    <div>
      <div className="main">
        <Header text="Register" />
        <InputGroup
          type="text"
          label="Full Name"
          name="fullname"
          placeholder="Anne Hunter"
          value={formValues.fullname}
          error={formErrors.fullname}
          onChangeHandler={onChangeHandler}
        />
        <InputGroup
          type="text"
          label="Email"
          name="email"
          placeholder="anne@hunter@mail.com"
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
        <InputGroup
          type="password"
          label="Confirm Password"
          name="confirm"
          placeholder="******"
          value={formValues.confirm}
          error={formErrors.confirm}
          onChangeHandler={onChangeHandler}
        />
        <Button
          name="register"
          text="Register"
          variant="light"
          className={"btn-cyan"}
          onClick={onRegisterSubmitHandler}
        />
      </div>
    </div>
  );
};

export default Register;
