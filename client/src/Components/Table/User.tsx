import React, { ElementRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import BsButton from "react-bootstrap/Button";

import ConfirmModal from "../Modal/ConfirmModal";
import TableHeader from "../TableHeader";
import EmptyRow from "../EmptyRow";

// import { ApiDeleteUser } from "../../Utilitites/Api";
// import { LoggedIn } from "../../Utilitites/LoggedIn";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteUser } from "../../Utilitites/Slice/UserSlice";

type AppProps = {
  data: {
    name: string;
    headers: Array<{
      label:string;
      width:string;
    }>;
    minRows: number;
    numCols: number;
  };
};

const User = ({ data }: AppProps) => {
  // const dispatch = useDispatch();
  // const loggedIn = LoggedIn();
  const navigate = useNavigate();
  // const lists = useSelector((state) => state.user.data);
  const lists: string[] = [];
  const [deleteUserId, setDeleteUserId] = useState("");
  const [userDeleted, setUserDeleted] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = ():void => setShow(false);
  const modalData = {
    header: "Confirm User Deletion",
    body: "Are you sure ?",
    image: "",
    confirmValue: "ok",
    cancelValue: "Cancel",
  };

  const [users, setUsers] = useState([]);
  // useEffect(() => {
  //   setUsers(lists);
  // }, [lists,userDeleted]);

  const editAction = (id: string) => {
    return (
      <BsButton
        className="btn-action"
        variant="link"
        onClick={() => navigate("/edit-user", { state: id })}
      >
        Edit
      </BsButton>
    );
  };

  const deleteAction = (id: string) => {
    return (
      <BsButton
        className="btn-action"
        variant="link"
        onClick={() => onDeleteActionHandler(id)}
      >
        Delete
      </BsButton>
    );
  };

  const deleteDisable = () => {
    return (
      <BsButton className="btn-disable" variant="link">
        Delete
      </BsButton>
    );
  };

  const onDeleteActionHandler = (id: string) => {
    setDeleteUserId(id);
    setShow(true);
  };

  const onDeleteHandler = (): void => {
    // dispatch(deleteUser(deleteUserId)).then(() => {
    //   setUserDeleted(deleteUserId);
    //   setShow(false);
    // });
  };
  return (
    <div className="table-container">
      <Table striped>
        <TableHeader headers={data.headers} />
        <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              {/* <td className="td-left">{user.fullname}</td>
              <td className="td-border">{user.email}</td>
              <td>
                {editAction(user._id)}|
                {loggedIn.userId !== user._id
                  ? deleteAction(user._id)
                  : deleteDisable()}
              </td> */}
            </tr>
          ))}
          <EmptyRow
            count={data.minRows - lists.length}
            colCount={data.numCols}
          />
        </tbody>
      </Table>
      <ConfirmModal
        show={show}
        handleClose={handleClose}
        modalData={modalData}
        onConfirmHandler={onDeleteHandler}
      />
    </div>
  );
};

export default User;
