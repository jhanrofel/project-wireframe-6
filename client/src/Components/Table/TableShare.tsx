import { useState } from "react";
import Table from "react-bootstrap/Table";
import BsButton from "react-bootstrap/Button";

import ConfirmModal from "../modal/confirmModal";
import TableHeader from "../tableHeader";
import EmptyRow from "../emptyRow";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { fetchShareOne, deleteShare } from "../../utilities/slice/shareToSlice";

interface UsersOne {
  fullname: string;
}

interface ShareTosOneState {
  id: string;
  user: string;
  upload: string;
  shareToUser: UsersOne;
}

type AppProps = {
  data: {
    headers: Array<{
      label: string;
      width: string;
    }>;
    minRows: number;
    numCols: number;
  };
  shareTos: ShareTosOneState[];
};

const TableShare = ({ data, shareTos }: AppProps) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const modalData = {
    header: "Confirm From Web Page",
    body: "Are you sure ?",
    image: "",
    confirmValue: "ok",
    cancelValue: "Cancel",
  };
  const dispatch = useAppDispatch();
  const shareToOne = useAppSelector((state) => state.shareTos.dataOne);

  const removeAction = (id: string) => {
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

  const onRemoveActionHandler = (id: string): void => {
    dispatch(fetchShareOne(id));
    setShow(true);
  };

  const oneRemoveHandler = async () => {
    await dispatch(deleteShare(shareToOne.id)).then(() => {
      setShow(false);
    });
  };
  return (
    <div className="table-container">
      <Table striped>
        <TableHeader headers={data.headers} />
        <tbody>
          {shareTos.map((shareTo, i) => (
            <tr key={i}>
              <td className="td-left">{shareTo.shareToUser.fullname}</td>
              <td className="td-border-left">{removeAction(shareTo.id)}</td>
            </tr>
          ))}
          <EmptyRow
            count={data.minRows - shareTos.length}
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
  );
};

export default TableShare;
