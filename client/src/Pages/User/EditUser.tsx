import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

import Header from "../../Components/Header";
import Button from "../../Components/Button";
import InputGroup from "../../Components/InputGroup";

// import { LoggedInCreate, LoggedIn } from "../../Utilitites/LoggedIn";
// import { editUser, fetchUserOne } from "../../Utilitites/Slice/UserSlice";
const EditUser: React.FC = () => {
  // const loggedIn = LoggedIn();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { state } = useLocation();
  const userId = state;

  // const user = useSelector((state) => state.user.dataOne);

  // const [formValues, setFormValues] = useState({
  //   fullname: user.fullname || "",
  //   email: user.email || "",
  // });

  const [formValues, setFormValues] = useState({
    fullname: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({
    fullname: "",
    email: "",
    form: "",
  });

  // useEffect(() => {
  //   dispatch(fetchUserOne(userId));
  // }, [dispatch, userId]);

  // useEffect(() => {
  //   setFormValues((state) => ({
  //     ...state,
  //     fullname: user.fullname || "",
  //     email: user.email || "",
  //   }));
  // }, [user]);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
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

  const onSaveSubmitHandler = async () => {  
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
      navigate("/users-list");
      // await dispatch(editUser({ userId, formValues })).then((res) => {
      //   if (!res.error) {
      //     if (userId === loggedIn.userId)
      //       LoggedInCreate({ ...formValues, _id: userId });
      //     navigate("/users-list");
      //   } else {
      //     alert(res.payload);
      //   }
      // });
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
