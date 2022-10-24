import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import BsButton from "react-bootstrap/Button";

import ConfirmModal from "../Modal/ConfirmModal";
import TableHeader from "../TableHeader";
import EmptyRow from "../EmptyRow";
import { type } from "@testing-library/user-event/dist/type";
// import { useDispatch } from "react-redux";
// import { deleteShare } from "../../Utilitites/Slice/ShareSlice";

type AppProps = {
  data: {
    headers: Array<{
      label:string;
      width:string;
    }>;
    minRows: number;
    numCols: number;
  }
  shareLists: string[];
}

const TableShare = ({ data, shareLists } : AppProps) => {
  // const dispatch = useDispatch();
  const [removeShareId, setRemoveShareId] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const modalData = {
    header: "Confirm From Web Page",
    body: "Are you sure ?",
    image: "",
    confirmValue: "ok",
    cancelValue: "Cancel",
  };

  const removeAction = (id:string) => {
    return (
      <BsButton
        className="btn-action"
        variant="link"
        onClick={() => onRemoveActionHandler(id)}
      >
        Remove
      </BsButton>
    );
  };

  const onRemoveActionHandler = (id:string):void => {
    setRemoveShareId(id);
    setShow(true);
  };

  const oneRemoveHandler = async () => {
    // await dispatch(deleteShare(removeShareId)).then(() => {
    //   setShow(false);
    // });
  };
  return (
    <div className="table-container">
      <Table striped>
        <TableHeader headers={data.headers} />
        <tbody>
          {shareLists.map((list, i) => (
            <tr key={i}>
               {/* <td className="td-left">{list.toUserId.fullname}</td>
               <td className="td-border-left">{removeAction(list._id)}</td> */}
            </tr>
          ))}
          <EmptyRow
            count={data.minRows - shareLists.length}
            colCount={data.numCols}
          />
        </tbody>
      </Table>
      <ConfirmModal
        show={show}
        handleClose={handleClose}
        modalData={modalData}
        onConfirmHandler={oneRemoveHandler}
      />
    </div>
  )
}

export default TableShare;