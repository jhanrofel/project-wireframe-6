import React, { useState } from "react";
import BsButton from "react-bootstrap/Button";
import BsModal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { LoggedIn } from "../../utilities/loggedIn";
import { useAppDispatch } from "../../utilities/hooks";
import { postUpload } from "../../utilities/slice/uploadSlice";

type AppProps = {
  show: boolean;
  handleClose: () => void;
};

const UploadModal = ({ show, handleClose }: AppProps) => {
  const dispatch = useAppDispatch();
  const closeButton = <FontAwesomeIcon icon={faXmark} />;
  const [formValues, setFormValues] = useState<{
    label: string;
    filename: string;
  }>({
    label: "",
    filename: "",
  });
  const [formFile, setFormFile] = useState<FileList | null>(null);
  const [uploadLabel, setUploadLabel] = useState("No file chosen...");
  const loggedIn = LoggedIn();

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    let name = target.name;
    let value = target.value;

    switch (name) {
      case "label":
        setFormValues((state) => ({ ...state, label: value }));
        break;
      case "file":
        const file = target.files;
        
        setUploadLabel(value.substring(12, 35));
        setFormValues((state) => ({ ...state, filename: value }));
        setFormFile(file);
        break;
      default:
        break;
    }
  };

  const onConfirmSubmitHandler = async (): Promise<void> => {
    // try {
    //   if (formValues.label === "")
    //     throw new Error("File description is required.");
    //   if (formValues.file === "") throw new Error("File upload is required.");
    // } catch (error) {
    //   alert(error);
    //   return;
    // }

    // const formData = new FormData();
    // formData.append("file", formFile);
    // formData.append("userId", loggedIn.id);
    // formData.append("label", formValues.label);
    // formData.append("filename", formValues.filename.substring(12));

    // await dispatch(postUpload(formData)).then(() => {
    //   setFormValues({ label: "", file: "" });
    //   setUploadLabel("No file chosen...");
    //   handleClose();
    // });

    console.log(formFile);
    await dispatch(postUpload(formFile)).then(() => {
      // setFormValues({ label: "", file: "" });
      setUploadLabel("No file chosen...");
      setFormFile(null);
      handleClose();
    });
  };
  return (
    <BsModal show={show} onHide={handleClose} name="modal-upload">
      <div className="modal-header">
        {"Upload"}
        <div className="gc-close" onClick={handleClose}>
          {closeButton}
        </div>
      </div>
      <div className="modal-body-confirm">
        <div className="mb-label-confirm">
          <span>File Description</span>
          <input
            type={"text"}
            name={"label"}
            value={formValues.label}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-label-confirm">
          <span>File Upload</span>
          <label className="button-choose">
            Choose file
            <input
              className="choose-file"
              type={"file"}
              name="file"
              onChange={onChangeHandler}
            />
          </label>
          <span>{uploadLabel}</span>
        </div>
        <div>
          <BsButton variant="lights" onClick={onConfirmSubmitHandler}>
            {"Upload Now"}
          </BsButton>
          <BsButton variant="lights" onClick={handleClose}>
            {"cancel"}
          </BsButton>
        </div>
      </div>
    </BsModal>
  );
};

export default UploadModal;
