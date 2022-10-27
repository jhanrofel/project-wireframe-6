import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BsButton from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import TableHeader from "../tableHeader";
import EmptyRow from "../emptyRow";
import ConfirmModal from "../modal/confirmModal";
import FileEditModal from "../modal/fileEditModal";
// import { ApiDownloadFile } from "../../Utilitites/Api";
import { useAppSelector, useAppDispatch } from "../../utilities/hooks";
import {
  fetchUploadOne,
  deleteUpload,
} from "../../utilities/slice/uploadSlice";

type AppProps = {
  data: {
    headers: Array<{
      label: string;
      width: string;
    }>;
    minRows: number;
    numCols: number;
  };
};

const UploadFile = ({ data }: AppProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const uploadLists = useAppSelector((state) => state.uploads.data);
  const upload = useAppSelector((state) => state.uploads.dataOne);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseEdit = () => setShowEdit(false);

  const modalData = {
    header: "Confirm User Deletion",
    body: "Are you sure ?",
    image: "",
    confirmValue: "ok",
    cancelValue: "Cancel",
  };

  const editAction = (id: string) => {
    return (
      <BsButton
        className="btn-action"
        variant="link"
        onClick={() => onEditActionHandler(id)}
      >
        Edit
      </BsButton>
    );
  };

  const onEditActionHandler = (id: string): void => {
    dispatch(fetchUploadOne(id));
    setShowEdit(true);
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

  const onDeleteActionHandler = (id: string): void => {
    dispatch(fetchUploadOne(id));
    setShow(true);
  };

  const onDeleteSubmitHandler = async (): Promise<void> => {
    const uploadId: string = upload.id;
    await dispatch(deleteUpload(uploadId)).then(() => {
      setShow(false);
    });
  };

  const downloadAction = (fileName: string, fileLocation: string) => {
    return (
      <BsButton
        className="btn-download"
        variant="link"
        onClick={() => onDownloadActionHandler(fileName, fileLocation)}
      >
        {fileName}
      </BsButton>
    );
  };

  const onDownloadActionHandler = async (
    fileName: string,
    fileLocation: string
  ): Promise<void> => {
    // await ApiDownloadFile({
    //   fileLocation: fileLocation,
    //   filename: fileName,
    // })
    //   .then(() => {
    //     setEditUploadId();
    //   })
    //   .catch((err) => console.log(err));
  };

  const shareAction = (id: string, filename: string) => {
    return (
      <BsButton
        className="btn-action"
        variant="link"
        onClick={() =>
          navigate("/share", { state: { id: id, filename: filename } })
        }
      >
        Share
      </BsButton>
    );
  };

  return (
    <div className="table-container">
      <Table striped>
        <TableHeader headers={data.headers} />
        <tbody>
          {uploadLists.map((list, i) => (
            <tr key={i}>
              <td className="td-left">{list.label}</td>
              <td className="td-border">
                {downloadAction(list.filename, list.fileLocation)}
              </td>
              <td>
                {editAction(list.id)}|{deleteAction(list.id)}|
                {shareAction(list.id, list.label)}
              </td>
            </tr>
          ))}
          <EmptyRow
            count={data.minRows - uploadLists.length}
            colCount={data.numCols}
          />
        </tbody>
      </Table>
      <ConfirmModal
        show={show}
        handleClose={handleClose}
        modalData={modalData}
        onConfirmHandler={onDeleteSubmitHandler}
      />
      <FileEditModal showEdit={showEdit} handleCloseEdit={handleCloseEdit} />
    </div>
  );
};

export default UploadFile;
