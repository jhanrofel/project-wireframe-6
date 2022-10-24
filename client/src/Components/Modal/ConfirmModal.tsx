import React from "react";
import BsButton from "react-bootstrap/Button";
import BsModal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";

type AppProps = {
  show: boolean;
  handleClose: () => void;
  modalData: {
    header: string;
    body: string;
    image: string;
    confirmValue: string;
    cancelValue: string;
  };
  onConfirmHandler: () => void;
};

const ConfirmModal = ({
  show,
  handleClose,
  modalData,
  onConfirmHandler,
}: AppProps) => {
  const questionMark = <FontAwesomeIcon icon={faCircleQuestion} />;
  const closeButton = <FontAwesomeIcon icon={faXmark} />;

  return <BsModal show={show} onHide={handleClose} id="modal-confirm">
      <div className="modal-header">
        {modalData.header}
        <div className="gc-close" onClick={handleClose}>
          {closeButton}
        </div>
      </div>
      <div className="modal-body">
        <div className="modal-img">
          {questionMark}
          {modalData.body}
        </div>
        <div>
          <BsButton variant="lights" onClick={onConfirmHandler}>
            {modalData.confirmValue}
          </BsButton>
          <BsButton variant="lights" onClick={handleClose}>
            {modalData.cancelValue}
          </BsButton>
        </div>
      </div>
    </BsModal>;
};

export default ConfirmModal;
