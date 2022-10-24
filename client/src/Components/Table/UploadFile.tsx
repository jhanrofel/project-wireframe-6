import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import BsButton from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import TableHeader from "../TableHeader";
import EmptyRow from "../EmptyRow";
import ConfirmModal from "../Modal/ConfirmModal";
import FileEditModal from "../Modal/FileEditModal";

// import { ApiDownloadFile } from "../../Utilitites/Api";
// import { useDispatch } from "react-redux";
// import { deleteUpload } from "../../Utilitites/Slice/UploadSlice";
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

  uploadLists: string[];
};

const UploadFile = ({ data, uploadLists }: AppProps) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [deleteUploadId, setDeleteUploadId] = useState("");
  const [editUploadId, setEditUploadId] = useState("");
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
    setEditUploadId(id);
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
    setDeleteUploadId(id);
    setShow(true);
  };

  const onDeleteHandler = async (): Promise<void> => {
    // await dispatch(deleteUpload(deleteUploadId)).then(() => {
    //   setEditUploadId("");
    //   setDeleteUploadId("");
    //   setShow(false);
    // });
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
              {/* <td className="td-left">{list.label}</td>
              <td className="td-border">
                {downloadAction(list.filename, list.fileLocation)}
              </td>
              <td>
                {editAction(list._id)}|{deleteAction(list._id)}|
                {shareAction(list._id, list.label)}
              </td> */}
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
        onConfirmHandler={onDeleteHandler}
      />
      <FileEditModal
        showEdit={showEdit}
        handleCloseEdit={handleCloseEdit}
        editUploadId={editUploadId}
        uploadLists={uploadLists}
      />
    </div>
  );
};

export default UploadFile;
