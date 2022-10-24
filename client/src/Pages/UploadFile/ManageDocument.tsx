import React, { useState, useEffect } from "react";
import TableUploadFile from "../../Components/Table/UploadFile";
import ShareUpload from "../../Components/Table/ShareUpload";
import TableTitle from "../../Components/TableTitle";
import Button from "../../Components/Button";
import UploadModal from "../../Components/Modal/UploadModal";

// import { LoggedIn } from "../../Utilitites/LoggedIn";
// import { useDispatch,useSelector } from "react-redux";
// import { fetchUploads } from "../../Utilitites/Slice/UploadSlice";
const ManageDocument: React.FC = () => {
  // const loggedIn = LoggedIn();
  // const dispatch = useDispatch();

  // const uploadLists = useSelector((state) => state.upload.data);
  const uploadLists:string[] = [];
  
  // useEffect(() => {
  //   dispatch(fetchUploads(loggedIn.userId));
  // },[dispatch,loggedIn.userId]);

  const uploadFiles = {
    name: "upload-file",
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
      <TableUploadFile
        data={uploadFiles}
        uploadLists={uploadLists}
      />
      <TableTitle text="Share Uploads" />
      <div>
        <ShareUpload data={shareFiles}/>
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
  )
}

export default ManageDocument;