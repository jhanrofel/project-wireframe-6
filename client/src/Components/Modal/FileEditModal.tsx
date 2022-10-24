import React, { useState, useEffect } from "react";
import BsButton from "react-bootstrap/Button";
import BsModal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// import { useDispatch } from "react-redux";
// import { updateUpload } from "../../Utilitites/Slice/UploadSlice";

type AppProps = {
  showEdit:boolean;
  handleCloseEdit: () => void;
  editUploadId: string;
  uploadLists: string[];
}

const FileEditModal = ({
  showEdit,
  handleCloseEdit,
  editUploadId,
  uploadLists,
} : AppProps) => {
  // const dispatch = useDispatch();
  const closeButton = <FontAwesomeIcon icon={faXmark} />;
  const [fileLabel, setFileLabel] = useState("");

  // useEffect(() => {
  //   setFileLabel(      
  //     editUploadId
  //       ? uploadLists.filter((upload) => upload._id === editUploadId)[0].label
  //       : ""
  //   );// eslint-disable-next-line
  // }, [editUploadId]);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setFileLabel((event.target as HTMLInputElement).value);
  };

  const onConfirmSubmitHandler = async () => {
    try {
      if (fileLabel === "") throw new Error("File description is required.");
    } catch (error) {
      // alert(error.message);
      return;
    }
    
    // await dispatch(updateUpload({ editUploadId, fileLabel})).then(() => {
    //   handleCloseEdit();
    // });
  };
  return (
    <BsModal show={showEdit} onHide={handleCloseEdit} name="modal-upload">
      <div className="modal-header">
        {"Upload"}
        <div className="gc-close" onClick={handleCloseEdit}>
          {closeButton}
        </div>
      </div>
      <div className="modal-body-edit">
        <div className="mb-label-edit">
          <span>File Description</span>
          <input
            type={"text"}
            name={"label"}
            value={fileLabel}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <BsButton variant="lights" onClick={onConfirmSubmitHandler}>
            {"Save"}
          </BsButton>
          <BsButton variant="lights" onClick={handleCloseEdit}>
            {"Cancel"}
          </BsButton>
        </div>
      </div>
    </BsModal>
  )
}

export default FileEditModal;