import React, { useEffect } from "react";
import TableUser from "../../components/table/userTable";
import TableTitle from "../../components/tableTitle";
import { useAppDispatch } from "../../utilities/hooks";
import { fetchUsers } from "../../utilities/slice/userSlice";

interface tableValue {
  name: string;
  headers: Array<{
    label: string;
    width: string;
  }>;
  minRows: number;
  numCols: number;
}

const ManageDocument: React.FC = () => {
  const dispatch = useAppDispatch();

  const users: tableValue = {
    name: "users",
    headers: [
      { label: "Name", width: "40%" },
      { label: "User Email ID", width: "35%" },
      { label: "", width: "35%" },
    ],
    minRows: 10,
    numCols: 3,
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <TableTitle text="Users" />
      <TableUser data={users} />
    </>
  );
};

export default ManageDocument;
