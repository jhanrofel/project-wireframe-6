import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import BsButton from "react-bootstrap/Button";
import ConfirmModal from "../modal/confirmModal";
import TableHeader from "../tableHeader";
import EmptyRow from "../emptyRow";
import { loggedInData } from "../../utilities/loggedIn";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { deleteUser } from "../../utilities/slice/userSlice";

type AppProps = {
  data: {
    name: string;
    headers: Array<{
      label: string;
      width: string;
    }>;
    minRows: number;
    numCols: number;
  };
};

interface UsersOneState {
  id: string;
  fullname: string;
  email: string;
}

const UserTable = ({ data }: AppProps) => {
  const dispatch = useAppDispatch();
  const loggedIn = loggedInData();
  const navigate = useNavigate();
  const lists: UsersOneState[] = useAppSelector((state) => state.users.data);
  const [deleteUserId, setDeleteUserId] = useState<string>("");
  const [userDeleted, setUserDeleted] = useState<string>("");
  const [show, setShow] = useState(false);
  const handleClose = (): void => setShow(false);
  const modalData = {
    header: "Confirm User Deletion",
    body: "Are you sure ?",
    image: "",
    confirmValue: "ok",
    cancelValue: "Cancel",
  };

  const [users, setUsers] = useState<UsersOneState[]>(lists);
  useEffect(() => {
    setUsers(lists);
  }, [lists, userDeleted]);

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
    dispatch(deleteUser(deleteUserId)).then(() => {
      setUserDeleted(deleteUserId);
      setShow(false);
    });
  };

  return (
    <div className="table-container">
      <Table striped>
        <TableHeader headers={data.headers} />
        <tbody>
          {users.map((user: UsersOneState, i) => (
            <tr key={i}>
              <td className="td-left">{user.fullname}</td>
              <td className="td-border">{user.email}</td>
              <td>
                {editAction(user.id)}|
                {loggedIn.id !== user.id
                  ? deleteAction(user.id)
                  : deleteDisable()}
              </td>
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

export default UserTable;
