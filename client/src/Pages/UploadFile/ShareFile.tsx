import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BsButton from "react-bootstrap/Button";
import TableShare from "../../Components/table/tableShare";
import TableTitle from "../../Components/tableTitle";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import {
  fetchUploadShareTos,
  fetchUploadChoose,
  postShare,
} from "../../utilities/slice/shareToSlice";

const ShareFile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const [uploadFile] = useState(state);

  const shareFiles = {
    headers: [
      { label: "Shared User", width: "50%" },
      { label: "Action", width: "50%" },
    ],
    minRows: 5,
    numCols: 2,
  };

  const shareTos = useAppSelector((state) => state.shareTos.dataShares);
  const shareToChoose = useAppSelector(
    (state) => state.shareTos.dataChooseUser
  );

  const [selectUser, setSelectUser] = useState("");
  const uploadid: string = uploadFile.id;

  useEffect(() => {
    dispatch(fetchUploadShareTos(uploadid));
    dispatch(fetchUploadChoose(uploadid));
  }, [dispatch, uploadid]);

  const onChangeSelectHandler = (event: React.FormEvent<HTMLSelectElement>) => {
    let value = (event.target as HTMLInputElement).value;
    setSelectUser(value);    
  };

  const onShareSubmitHandler = async (): Promise<void> => {
    if (selectUser === "") {
      alert("Choose user is required.");
      return;
    }

    await dispatch(postShare({ user: selectUser, upload: uploadid })).then(
      () => {
        setSelectUser("");
      }
    );
  };
  return (
    <>
      <TableTitle text={`Upload Sharing : ${uploadFile.filename}`} />
      <TableShare data={shareFiles} shareTos={shareTos} />
      <TableTitle text="Add Sharing" />
      <div className="choose-body">
        <span> Choose User : </span>
        <select
          value={selectUser}
          onChange={onChangeSelectHandler}
        >
          <option value="">{"--Select--"}</option>
          {shareToChoose.map((user, i) => (
            <option key={i} value={user.id}>
              {user.fullname}
            </option>
          ))}
        </select>
        <BsButton name="share" variant="light" onClick={onShareSubmitHandler}>
          Share
        </BsButton>
      </div>
    </>
  );
};

export default ShareFile;
