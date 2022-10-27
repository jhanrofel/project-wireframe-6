import React, { useState, useEffect } from "react";
import TableUploadFile from "../../components/table/uploadFile";
import ShareUpload from "../../components/table/shareUpload";
import TableTitle from "../../components/tableTitle";
import Button from "../../components/button";
import UploadModal from "../../components/modal/uploadModal";
import { loggedInData } from "../../utilities/loggedIn";
import { useAppDispatch } from "../../utilities/hooks";
import { fetchUploads } from "../../utilities/slice/uploadSlice";

const ManageDocument: React.FC = () => {
  const loggedIn = loggedInData();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUploads(loggedIn.id));
  }, [dispatch, loggedIn.id]);

  const uploadFiles = {
    headers: [
      { label: "Label", width: "35%" },
      { label: "File Name", width: "35%" },
      { label: "Action", width: "40%" },
    ],
    minRows: 5,
    numCols: 3,
  };

  const shareFiles = {
    name: "share-file",
    headers: [
      { label: "Label", width: "35%" },
      { label: "File Name", width: "35%" },
      { label: "Shared by", width: "40%" },
    ],
    minRows: 5,
    numCols: 3,
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const uploadAction = () => {
    setShow(true);
  };
  return (
    <>
      <TableTitle text="My Uploads" />
      <TableUploadFile data={uploadFiles} />
      <TableTitle text="Share Uploads" />
      <div>
        <ShareUpload data={shareFiles} />
        <div className="button-style-upload">
          <Button
            name="upload"
            text="Upload"
            variant="light"
            className={"btn-cyan"}
            onClick={uploadAction}
          />
        </div>
      </div>
      <UploadModal
        show={show}
        handleClose={handleClose}
        // uploadLists={uploadLists}
        // setUploadFiles={setUploadFiles}
      />
    </>
  );
};

export default ManageDocument;
