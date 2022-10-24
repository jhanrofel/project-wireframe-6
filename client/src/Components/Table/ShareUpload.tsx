import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import BsButton from "react-bootstrap/Button";

import TableHeader from "../TableHeader";
import EmptyRow from "../EmptyRow";

// import { ApiDownloadFile } from "../../Utilitites/Api";
// import { LoggedIn } from "../../Utilitites/LoggedIn";

// import { useDispatch, useSelector } from "react-redux";
// import { fetchShareToUser } from "../../Utilitites/Slice/ShareSlice";

type AppProps = {
  data:  {
    name: string;
    headers: Array<{
      label:string;
      width:string;
    }>;
    minRows: number;
    numCols: number;
  };
}

const ShareUpload = ({data} : AppProps) => {
  // const dispatch = useDispatch();
  // const loggedIn = LoggedIn();
  // const shareFiles = useSelector((state) => state.share.data);
  const shareFiles:string[] = [];

  // useEffect(() => {
  //   dispatch(fetchShareToUser(loggedIn.userId));
  // }, [dispatch, loggedIn.userId]);

  const downloadAction = (fileName:string, fileLocation:string) => {
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

  const onDownloadActionHandler = (fileName:string, fileLocation:string):void => {
    // ApiDownloadFile({
    //   fileLocation: fileLocation,
    //   filename: fileName,
    // })
    //   .then()
    //   .catch((err) => console.log(err));
  };

  return (
    <div className="table-container">
      <Table striped>
        <TableHeader headers={data.headers} />
        <tbody>
          {/* {shareFiles.map((list, i) => (
            <tr key={i}>
              <td className="td-left">{list.uploadFileId.label}</td>
              <td className="td-border">
                {downloadAction(
                  list.uploadFileId.filename,
                  list.uploadFileId.fileLocation
                )}
              </td>
              <td>{list.fromUserId.email}</td>
            </tr>
          ))} */}
          <EmptyRow
            count={data.minRows - shareFiles.length}
            colCount={data.numCols}
          />
        </tbody>
      </Table>
    </div>
  )
}

export default ShareUpload;