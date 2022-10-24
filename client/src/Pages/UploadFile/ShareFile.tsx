import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BsButton from "react-bootstrap/Button";

import TableShare from "../../Components/Table/TableShare";
import TableTitle from "../../Components/TableTitle";

// import { LoggedIn } from "../../Utilitites/LoggedIn";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchUserToShare,
//   fetchShares,
//   postShare,
// } from "../../Utilitites/Slice/ShareSlice";

const ShareFile: React.FC = () => {
  // const dispatch = useDispatch();
  const { state } = useLocation();
  // const [uploadFile] = useState(state);
  // const loggedIn = LoggedIn();

  const shareFiles = {
    headers: [
      { label: "Shared User", width: "50%" },
      { label: "Action", width: "50%" },
    ],
    minRows: 5,
    numCols: 2,
  };
  // const userToShare = useSelector((state) => state.share.dataUser);
  // const shareLists = useSelector((state) => state.share.data);
  const userToShare:string[] = []
  const shareLists:string[] = []
  const [selectUser, setSelectUser] = useState("");
  // const uploadid = uploadFile.id;
  // const userId = loggedIn.userId;

  // useEffect(() => {
  //   dispatch(fetchUserToShare({ uploadid, userId }));
  //   dispatch(fetchShares(uploadid));
  // }, [dispatch, uploadid, userId]);

  const onShareHandler = async ():Promise<void> => {

    try {
      if (selectUser === "") throw new Error("Choose user is required.");
    } catch (error) {
      // alert(error.message);
      return;
    }

    const shareFileData = {
      // uploadFileId: uploadFile.id,
      // fromUserId: loggedIn.userId,
      toUserId: selectUser,
    };

    // await dispatch(postShare(shareFileData)).then(() => {
    //   setSelectUser("");
    // });

  };
  //${uploadFile.filename}
  return (
    <>
      <TableTitle text={`Upload Sharing : `} />
      <TableShare
        data={shareFiles}
        shareLists={shareLists}
      />
      <TableTitle text="Add Sharing" />
      <div className="choose-body">
        <span> Choose User : </span>
        <select
          value={selectUser}
          onChange={(e) => setSelectUser(e.target.value)}
        >
          <option value="">{"--Select--"}</option>
          {userToShare.map((user, i) => (
            <option key={i} >
              {/* value={user._id} {user.fullname} */}
            </option>
          ))}
        </select>
        <BsButton name="share" variant="light" onClick={onShareHandler}>
          Share
        </BsButton>
      </div>
    </>
  )
}

export default ShareFile;