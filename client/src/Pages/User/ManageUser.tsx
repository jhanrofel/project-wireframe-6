import React from "react";

import TableUser from "../../Components/Table/User";
import TableTitle from "../../Components/TableTitle";

// import { useDispatch,useSelector } from "react-redux";
// import { fetchUsers } from "../../Utilitites/Slice/UserSlice";

const ManageDocument: React.FC = () => {
  // const dispatch = useDispatch();

  const users = {
    name: "users",
    headers: [
      { label: "Name", width: "40%" },
      { label: "User Email ID", width: "35%" },
      { label: "", width: "35%" },
    ],
    minRows: 10,
    numCols: 3,
  };
  // const lists = useSelector((state) => state.user.data);

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, [dispatch]);
  return (
    <>
      <TableTitle text="Users" />
      <TableUser data={users}/>
    </>
  );
};

export default ManageDocument;
