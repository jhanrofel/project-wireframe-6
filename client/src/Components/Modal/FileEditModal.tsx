import React, { useState, useEffect } from "react";
import BsButton from "react-bootstrap/Button";
import BsModal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { updateUpload } from "../../utilities/slice/uploadSlice";

type AppProps = {
  showEdit: boolean;
  handleCloseEdit: () => void;
};

const FileEditModal = ({ showEdit, handleCloseEdit }: AppProps) => {
  const dispatch = useAppDispatch();
  const closeButton = <FontAwesomeIcon icon={faXmark} />;
  const upload = useAppSelector((state) => state.uploads.dataOne);
  const [fileLabel, setFileLabel] = useState<string>("");

  useEffect(() => {
    setFileLabel(upload.label || "");
  }, [dispatch, upload]);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setFileLabel((event.target as HTMLInputElement).value);
  };

  const onConfirmSubmitHandler = async () => {
    try {
      if (fileLabel === "") throw new Error("File description is required.");
    } catch (error) {
      alert(error);
      return;
    }

    interface formValues {
      label: string;
    }
    const uploadId: string = upload.id;
    const formValues = {
      label: fileLabel,
    } as formValues;

    await dispatch(updateUpload({ uploadId, formValues })).then(() => {
      handleCloseEdit();
    });
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
  );
};

export default FileEditModal;
