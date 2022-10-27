import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import Button from "../../components/button";
import InputGroup from "../../components/inputGroup";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { loggedInCreate, loggedInData } from "../../utilities/loggedIn";
import { fetchUserOne, editUser } from "../../utilities/slice/userSlice";
const EditUser: React.FC = () => {
  const loggedIn = loggedInData();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const userId = state;

  interface formValueState {
    fullname: string;
    email: string;
  }

  const user = useAppSelector((state) => state.users.dataOne);
  const [formValues, setFormValues] = useState<formValueState>({
    fullname: user.fullname || "",
    email: user.email || "",
  });
  const [formErrors, setFormErrors] = useState<formValueState>({
    fullname: "",
    email: "",
  });

  useEffect(() => {
    dispatch(fetchUserOne(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    setFormValues((state) => ({
      ...state,
      fullname: user.fullname || "",
      email: user.email || "",
    }));
  }, [user]);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    let name = (event.target as HTMLInputElement).name;
    let value = (event.target as HTMLInputElement).value;

    switch (name) {
      case "fullname":
        setFormValues((state) => ({ ...state, fullname: value }));
        setFormErrors((state) => ({ ...state, fullname: "", form: "" }));
        break;
      case "email":
        setFormValues((state) => ({ ...state, email: value }));
        setFormErrors((state) => ({ ...state, email: "", form: "" }));
        break;
      default:
        break;
    }
  };

  const onSaveSubmitHandler = async (): Promise<void> => {
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

    if (formValues.fullname !== "" && formValues.email !== "") {
      await dispatch(editUser({ userId, formValues })).then((res) => {
        if (res.type === "users/editUser/fulfilled") {
          if (userId === loggedIn.id)
            loggedInCreate({ ...formValues, id: userId });
          navigate("/users-list");
        } else {
          alert(res.payload);
        }
      });
    }
  };

  return (
    <div>
      <div className="main">
        <Header text="Edit User Information" />
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
          placeholder="ann.hunter@gmail.com"
          value={formValues.email}
          error={formErrors.email}
          onChangeHandler={onChangeHandler}
        />
        <Button
          name="save"
          text="Save"
          variant="light"
          className={"btn-cyan"}
          onClick={onSaveSubmitHandler}
        />
      </div>
    </div>
  );
};

export default EditUser;
